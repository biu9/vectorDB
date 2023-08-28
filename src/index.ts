#! /usr/bin/env node
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { loadDocument } from "./utils/loadDocument";
import { splitDocs } from "./utils/splitDocs";
import { EmbeddingItem } from "@azure/openai";
import { createVectorStore } from "./utils/createVectorStore";
require('dotenv').config()

const endpoint = process.env.AZURE_OPENAI_ENDPOINT || '';
const azureApiKey = process.env.AZURE_OPENAI_KEY || '';

const DOC_PATH = 'documents'

interface IVector extends EmbeddingItem {
  metadata: {
    path: string,
    startIndex: number,
    endIndex: number
  }
}

async function main() {

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "thy-openai-embedding";

  const documents = loadDocument(DOC_PATH);
  const splitedDocs = splitDocs(documents, 100);

  const res = await client.getEmbeddings(deploymentId, splitedDocs.map(doc => doc.content));
  const vectors: IVector[] = res.data.map((vector, idx) => {
    return {
      ...vector,
      metadata: {
        path: splitedDocs[idx].metaData.path,
        startIndex: splitedDocs[idx].metaData.startIndex,
        endIndex: splitedDocs[idx].metaData.endIndex
      }
    }
  })
  const inputQuery = await client.getEmbeddings(deploymentId, ['线程与进程的区别是什么?']);
  const vectorStore = createVectorStore(vectors);

  const queryVector = inputQuery.data[0].embedding;
  const res2 = vectorStore.query(queryVector, 2);
  console.log(res2);
}

main();