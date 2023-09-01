#! /usr/bin/env node
import { loadDocument } from "./utils/loadDocument";
import { splitDocs } from "./utils/splitDocs";
import { createVectorStore } from "./utils/createVectorStore";
import { IVectorStore } from "@/types";
require("dotenv").config();

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