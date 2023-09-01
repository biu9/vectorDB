#! /usr/bin/env node
import { IVectorStore } from "@/types";
declare function vectorStore({ docPath, splitSize, embeddingFunc }: IVectorStore): Promise<{
    query: (queryVector: number[], topK?: number) => {
        similarity: number;
        path: string;
        content: string;
    }[];
}>;
export { vectorStore };
