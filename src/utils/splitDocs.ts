import { IDocument,ISplitedDocument } from "@/types";

const splitDocs = (
  docs: IDocument[],
  splitSize: number
): ISplitedDocument[] => {
  const res: ISplitedDocument[] = [];

  docs.forEach((doc) => {
    const { content, metaData } = doc;
    const contentArr = content.split("\n");

    let start = 0;
    let end = splitSize;

    while (start < contentArr.length) {
      const content = contentArr.slice(start, end).join("\n");
      const metaData = {
        ...doc.metaData,
        startIndex: start,
        endIndex: end,
      };

      res.push({
        content,
        metaData,
      });

      start = end;
      end = start + splitSize;
    }
  });

  return res;
};

export { splitDocs };
