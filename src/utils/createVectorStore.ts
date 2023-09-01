import * as fs from "fs";
import { IVector } from "@/types";

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

const createVectorStore = (embeddings: IVector[]) => {
  let store: IVector[] = embeddings; // 利用闭包，存储所有的向量

  const query = (queryVector: number[], topK: number = 1) => {
    const res = store
      .map((embedding: IVector) => {
        const similarity = calCosineSimilarity(
          queryVector,
          embedding.embedding
        );
        const content = fs.readFileSync(embedding.metadata.path, "utf-8");
        const path = embedding.metadata.path;
        return {
            similarity,
            path,
            content,
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
