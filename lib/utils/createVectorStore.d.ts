interface IEmbedding {
    embedding: number[];
    metadata: {
        path: string;
        startIndex: number;
        endIndex: number;
    };
}
declare const createVectorStore: (embeddings: IEmbedding[]) => {
    query: (queryVector: number[], topK?: number) => {
        similarity: number;
        path: string;
        content: string;
    }[];
};
export { createVectorStore };
