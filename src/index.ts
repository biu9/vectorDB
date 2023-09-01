#! /usr/bin/env node
import { loadDocument } from "./utils/loadDocument";
import { splitDocs } from "./utils/splitDocs";
import { EmbeddingItem } from "@azure/openai";
import { createVectorStore } from "./utils/createVectorStore";
require("dotenv").config();

interface IVector extends EmbeddingItem {
  metadata: {
    path: string;
    startIndex: number;
    endIndex: number;
  };
}

interface IVectorStore {
  docPath: string;
  splitSize? :number;
  embeddingFunc: (splitedDocs: ISplitedDocument[]) => Promise<IVector[]>;
}

interface ISplitedDocument {
  content: string;
  metaData: {
    path: string;
    startIndex: number;
    endIndex: number;
  };
}

async function vectorStore({ docPath,splitSize=100,embeddingFunc }:IVectorStore) {
  const documents = loadDocument(docPath);
  const splitedDocs = splitDocs(documents, splitSize);
  const vectors = await embeddingFunc(splitedDocs);
  const vectorStore = createVectorStore(vectors);

  return vectorStore;
}

export {
  vectorStore
}