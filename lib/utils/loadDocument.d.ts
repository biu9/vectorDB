interface IDocument {
    content: string;
    metaData: {
        path: string;
    };
}
declare const loadDocument: (dirPath: string) => IDocument[];
export { loadDocument };
