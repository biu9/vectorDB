import { IDocument, ISplitedDocument } from "@/types";
declare const splitDocs: (docs: IDocument[], splitSize: number) => ISplitedDocument[];
export { splitDocs };
