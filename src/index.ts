#! /usr/bin/env node
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { loadDocument } from "./utils/loadDocument";
require('dotenv').config()

const endpoint = process.env.AZURE_OPENAI_ENDPOINT || '';
const azureApiKey = process.env.AZURE_OPENAI_KEY || '';

const DOC_PATH = 'documents'

async function main() {

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "thy-openai-embedding";

  const documents = loadDocument(DOC_PATH);

  const res = await client.getEmbeddings(deploymentId, ['hello']);

  console.log(res.data)

}

main();