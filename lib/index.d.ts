#! /usr/bin/env node
import { IVectorStore } from "@vectorDB/types";
declare function vectorStore({ docPath, splitSize, embeddingFunc }: IVectorStore): Promise<{
    query: (queryVector: number[], topK?: number) => {
        similarity: number;
        path: string;
        content: string;
    }[];
}>;
export { vectorStore };
