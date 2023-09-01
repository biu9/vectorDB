"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitDocs = void 0;
var splitDocs = function (docs, splitSize) {
    var res = [];
    docs.forEach(function (doc) {
        var content = doc.content, metaData = doc.metaData;
        var contentArr = content.split("\n");
        var start = 0;
        var end = splitSize;
        while (start < contentArr.length) {
            var content_1 = contentArr.slice(start, end).join("\n");
            var metaData_1 = __assign(__assign({}, doc.metaData), { startIndex: start, endIndex: end });
            res.push({
                content: content_1,
                metaData: metaData_1,
            });
            start = end;
            end = start + splitSize;
        }
    });
    return res;
};
exports.splitDocs = splitDocs;
