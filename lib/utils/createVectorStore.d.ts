import { IVector } from "@/types";
declare const createVectorStore: (embeddings: IVector[]) => {
    query: (queryVector: number[], topK?: number) => {
        similarity: number;
        path: string;
        content: string;
    }[];
};
export { createVectorStore };
