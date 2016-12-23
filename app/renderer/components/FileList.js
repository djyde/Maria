"use strict";
const React = require('react');
const core_1 = require('@blueprintjs/core');
const Row_1 = require('./Row');
const Col_1 = require('./Col');
const FileList = ({ files }) => {
    return (React.createElement("div", null, files.map((file, i) => (React.createElement(File, {key: i, file: file})))));
};
(function (DOWNLOAD_STATUS) {
    DOWNLOAD_STATUS[DOWNLOAD_STATUS["PAUSE"] = 0] = "PAUSE";
    DOWNLOAD_STATUS[DOWNLOAD_STATUS["DOWNLOADING"] = 1] = "DOWNLOADING";
    DOWNLOAD_STATUS[DOWNLOAD_STATUS["FINISHED"] = 2] = "FINISHED";
})(exports.DOWNLOAD_STATUS || (exports.DOWNLOAD_STATUS = {}));
var DOWNLOAD_STATUS = exports.DOWNLOAD_STATUS;
const File = ({ file }) => {
    return (React.createElement("div", {className: 'file-item'}, 
        React.createElement(Row_1.default, null, 
            React.createElement(Col_1.default, null, 
                React.createElement("div", {className: 'filename'}, file.filename)
            ), 
            React.createElement(Col_1.default, null, 
                React.createElement("div", {className: 'size'}, 
                    "- ", 
                    file.size)
            )), 
        React.createElement(Row_1.default, null, 
            React.createElement(Col_1.default, {span: 1, className: 'progress-bar'}, 
                React.createElement(core_1.ProgressBar, {value: 0.4})
            )
        )));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileList;
