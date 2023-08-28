interface IEmbedding {
  embedding: number[];
  metadata: {
    path: string;
    startIndex: number;
    endIndex: number;
  };
}

const calCosineSimilarity = (vector1: number[], vector2: number[]) => {
  const dotProduct = vector1.reduce((acc, cur, idx) => {
    return acc + cur * vector2[idx];
  }, 0);

  const norm1 = Math.sqrt(
    vector1.reduce((acc, cur) => {
      return acc + cur * cur;
    }, 0)
  );

  const norm2 = Math.sqrt(
    vector2.reduce((acc, cur) => {
      return acc + cur * cur;
    }, 0)
  );

  return dotProduct / (norm1 * norm2);
};

const createVectorStore = (embeddings: IEmbedding[]) => {
  let store: IEmbedding[] = embeddings; // 利用闭包，存储所有的向量

  const query = (queryVector: number[], topK: number = 1) => {
    const res = store
      .map((embedding: IEmbedding) => {
        const similarity = calCosineSimilarity(
          queryVector,
          embedding.embedding
        );
        return {
          ...embedding,
          similarity,
        };
      })
      .sort((a, b) => {
        return b.similarity - a.similarity;
      })
      .slice(0, topK);

    return res;
  };

  return {
    query,
  };
};

export { createVectorStore };
