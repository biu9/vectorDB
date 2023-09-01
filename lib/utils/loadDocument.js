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
exports.loadDocument = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var loadDocument = function (dirPath) {
    var res = [];
    var files = fs.readdirSync(dirPath);
    files.forEach(function (file) {
        var filePath = path.join(dirPath, file);
        var isDirectory = fs.statSync(filePath).isDirectory();
        if (isDirectory) {
            // 如果是文件夹，则递归调用读取文件的函数
            res.push.apply(res, loadDocument(filePath));
        }
        else {
            // 如果是文件，则进行相应的处理
            var fileData = fs.readFileSync(filePath, "utf-8");
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
exports.loadDocument = loadDocument;
