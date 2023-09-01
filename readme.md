## vertor store

用typescript实现的vector db

> 为什么会有这个东西呢?
> 因为在做公司内部的文档机器人的时候,我悲剧的发现内部npm没有langchain
> 因此只能蛋疼的手搓一个vector store以供迁移

### 优势

在公司的开发中，如果要引入GPT等工具做增效工具,我们不可避免地需要考虑信安等因素

大部分公司的解决方案都是内部封装一个GPT的api,由信安部门做过滤

但是当我们使用这种api搭建基于vector db的文档机器人这类的产品时，就会遇到一个问题，那就是目前流行的提供此类功能的工具库大多是高度集成的(此处点名langchain),这意味着我们很难把其内部调用的api换成公司内部的api

本项目提出的背景也是基于此,本项目将获取embedding与构建vector store剥离开来,方便受限情况下的文档机器人的搭建

### 使用

1. `npm i vectordb-js`
2. 接入自己编写的获取openai embedding结果的函数,以azure openai版本为例:
   ```typescript
   import { vectorStore } from "vectordb-js";
    import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
    import { ISplitedDocument,IVector } from "./types";
    require("dotenv").config();

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
    const azureApiKey = process.env.AZURE_OPENAI_KEY || "";

    const DOC_PATH = "documents";

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const deploymentId = "thy-openai-embedding";

    async function openaiEmbedding(
        splitDocs: ISplitedDocument[]
    ): Promise<IVector[]> {
        const res = await client.getEmbeddings(
            deploymentId,
            splitDocs.map((doc) => doc.content)
        );
        const vectors: IVector[] = res.data.map((vector, idx) => {
            return {
                embedding: vector.embedding,
                metadata: {
                    path: splitDocs[idx].metaData.path,
                    startIndex: splitDocs[idx].metaData.startIndex,
                    endIndex: splitDocs[idx].metaData.endIndex,
                },
            };
        });
        return vectors;
    }

    async function main(queryQuestion: string) {
    const openaiVectorStore = await vectorStore({
        docPath: DOC_PATH,
        embeddingFunc: openaiEmbedding,
    });
    const inputQuery = await client.getEmbeddings(deploymentId, [
        queryQuestion,
    ]);

    const queryVector = inputQuery.data[0].embedding;
    const res2 = openaiVectorStore.query(queryVector, 2);

    console.log(res2);
    }

    main("线程与进程的区别是什么?");
   ```