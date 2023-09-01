import { IVector } from "@vectorDB/types";
declare const createVectorStore: (embeddings: IVector[]) => {
    query: (queryVector: number[], topK?: number) => {
        similarity: number;
        path: string;
        content: string;
    }[];
};
export { createVectorStore };
