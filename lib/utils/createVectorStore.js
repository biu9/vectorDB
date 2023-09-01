"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVectorStore = void 0;
var fs = __importStar(require("fs"));
var calCosineSimilarity = function (vector1, vector2) {
    var dotProduct = vector1.reduce(function (acc, cur, idx) {
        return acc + cur * vector2[idx];
    }, 0);
    var norm1 = Math.sqrt(vector1.reduce(function (acc, cur) {
        return acc + cur * cur;
    }, 0));
    var norm2 = Math.sqrt(vector2.reduce(function (acc, cur) {
        return acc + cur * cur;
    }, 0));
    return dotProduct / (norm1 * norm2);
};
var createVectorStore = function (embeddings) {
    var store = embeddings; // 利用闭包，存储所有的向量
    var query = function (queryVector, topK) {
        if (topK === void 0) { topK = 1; }
        var res = store
            .map(function (embedding) {
            var similarity = calCosineSimilarity(queryVector, embedding.embedding);
            var content = fs.readFileSync(embedding.metadata.path, "utf-8");
            var path = embedding.metadata.path;
            return {
                similarity: similarity,
                path: path,
                content: content,
            };
        })
            .sort(function (a, b) {
            return b.similarity - a.similarity;
        })
            .slice(0, topK);
        return res;
    };
    return {
        query: query,
    };
};
exports.createVectorStore = createVectorStore;
