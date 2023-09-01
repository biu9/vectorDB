interface IDocument {
    content: string;
    metaData: {
        path: string;
    };
}
interface ISplitedDocument {
    content: string;
    metaData: {
        path: string;
        startIndex: number;
        endIndex: number;
    };
}
declare const splitDocs: (docs: IDocument[], splitSize: number) => ISplitedDocument[];
export { splitDocs };
