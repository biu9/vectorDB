import { vectorStore } from "../index";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { ISplitedDocument,IVector } from "@/types";

const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
const azureApiKey = process.env.AZURE_OPENAI_KEY || "";

const DOC_PATH = "documents";

const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
const deploymentId = "thy-openai-embedding";

async function openaiEmbedding(
  splitDocs: ISplitedDocument[]
): Promise<IVector[]> {
  const res = await client.getEmbeddings(
    deploymentId,
    splitDocs.map((doc) => doc.content)
  );
  const vectors: IVector[] = res.data.map((vector, idx) => {
    return {
      embedding: vector.embedding,
      metadata: {
        path: splitDocs[idx].metaData.path,
        startIndex: splitDocs[idx].metaData.startIndex,
        endIndex: splitDocs[idx].metaData.endIndex,
      },
    };
  });
  return vectors;
}

async function main(queryQuestion: string) {
  const openaiVectorStore = await vectorStore({
    docPath: DOC_PATH,
    embeddingFunc: openaiEmbedding,
  });
  const inputQuery = await client.getEmbeddings(deploymentId, [
    queryQuestion,
  ]);

  const queryVector = inputQuery.data[0].embedding;
  const res2 = openaiVectorStore.query(queryVector, 2);

  console.log(res2);
}

main("线程与进程的区别是什么?");
