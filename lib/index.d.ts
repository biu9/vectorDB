#! /usr/bin/env node
import { EmbeddingItem } from "@azure/openai";
interface IVector extends EmbeddingItem {
    metadata: {
        path: string;
        startIndex: number;
        endIndex: number;
    };
}
interface IVectorStore {
    docPath: string;
    splitSize?: number;
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
declare function vectorStore({ docPath, splitSize, embeddingFunc }: IVectorStore): Promise<{
    query: (queryVector: number[], topK?: number) => {
        similarity: number;
        path: string;
        content: string;
    }[];
}>;
export { vectorStore };
