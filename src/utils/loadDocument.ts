import * as fs from "fs";
import * as path from "path";

interface IDocument {
  content: string;
  metaData: {
    path: string;
  };
}

const loadDocument = (dirPath: string) => {
  const res: IDocument[] = [];
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const isDirectory = fs.statSync(filePath).isDirectory();

    if (isDirectory) {
      // 如果是文件夹，则递归调用读取文件的函数
      res.push(...loadDocument(filePath));
    } else {
      // 如果是文件，则进行相应的处理
      const fileData = fs.readFileSync(filePath, "utf-8");
      res.push({
        content: fileData,
        metaData: {
          path: filePath,
        },
      });
    }
  });

  return res;
};

export { loadDocument };
