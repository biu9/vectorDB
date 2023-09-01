export interface ISplitedDocument {
  content: string;
  metaData: {
    path: string;
    startIndex: number;
    endIndex: number;
  };
}

export interface IVector {
  metadata: {
    path: string;
    startIndex: number;
    endIndex: number;
  };
  /**
   * List of embeddings value for the input prompt. These represent a measurement of the
   * vector-based relatedness of the provided input.
   */
  embedding: number[];
}

export interface IVectorStore {
  docPath: string;
  splitSize?: number;
  embeddingFunc: (splitedDocs: ISplitedDocument[]) => Promise<IVector[]>;
}

export interface IDocument {
  content: string;
  metaData: {
    path: string;
  };
}
