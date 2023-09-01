export interface ISplitedDocument {
    /**
     * The content of the document.
     */
    content: string;
    /**
     * The metadata of the document.
     */
    metaData: {
        /**
         * The path of the document.
         */
        path: string;
        /**
         * The start index of the document.
         */
        startIndex: number;
        /**
         * The end index of the document.
         */
        endIndex: number;
    };
}
export interface IVector {
    metadata: {
        /**
         * The path of the document.
         */
        path: string;
        /**
         * The start index of the document.
         */
        startIndex: number;
        /**
         * The end index of the document.
         */
        endIndex: number;
    };
    /**
     * List of embeddings value for the input prompt. These represent a measurement of the
     * vector-based relatedness of the provided input.
     */
    embedding: number[];
}
export interface IVectorStore {
    /**
     * the document path loaded by the vector store.
     */
    docPath: string;
    /**
     * the split size of the document. default is 100
     */
    splitSize?: number;
    /**
     * the embedding function to calculate the vector of the document.
     */
    embeddingFunc: (splitedDocs: ISplitedDocument[]) => Promise<IVector[]>;
}
export interface IDocument {
    /**
     * The content of the document.
     */
    content: string;
    metaData: {
        /**
         * The path of the document.
         */
        path: string;
    };
}
