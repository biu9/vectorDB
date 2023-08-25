#! /usr/bin/env node
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
require('dotenv').config()

const endpoint = process.env.AZURE_OPENAI_ENDPOINT || '';
const azureApiKey = process.env.AZURE_OPENAI_KEY || '';

let messages = [
    { role: "system", content: "" },
    { role: "user", content: "你好" },
  ];
  

async function main() {
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const deploymentId = "thy111";

    const res = await client.getChatCompletions(deploymentId, messages);

    console.log(res.choices[0].message?.content)
}

main();