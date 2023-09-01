import { IDocument, ISplitedDocument } from "@vectorDB/types";
declare const splitDocs: (docs: IDocument[], splitSize: number) => ISplitedDocument[];
export { splitDocs };
