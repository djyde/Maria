"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const core_1 = require('@blueprintjs/core');
const Row_1 = require('./Row');
const Col_1 = require('./Col');
const file_store_1 = require('../stores/file.store');
const mobx_react_1 = require('mobx-react');
const FileList = ({ files }) => {
    return (React.createElement("div", null, files.map(file => {
        const fileStore = new file_store_1.FileStore(file);
        return (React.createElement(File, {key: fileStore.file.gid, fileStore: fileStore}));
    })));
};
let File = class File extends React.Component {
    render() {
        const { fileStore } = this.props;
        return (React.createElement("div", {className: 'file-item'}, 
            React.createElement(Row_1.default, null, 
                React.createElement(Col_1.default, null, 
                    React.createElement("div", {className: 'filename'}, fileStore.file.filename)
                ), 
                React.createElement(Col_1.default, null, 
                    React.createElement("div", {className: 'size'}, 
                        "- ", 
                        fileStore.fileSize)
                )), 
            React.createElement(Row_1.default, null, 
                React.createElement(Col_1.default, {span: 1, className: 'progress-bar'}, 
                    React.createElement(core_1.ProgressBar, {value: fileStore.progress})
                )
            )));
    }
    renderContextMenu() {
        return (React.createElement(core_1.Menu, null, 
            React.createElement(core_1.MenuItem, {iconName: '', text: "Open"}), 
            React.createElement(core_1.MenuItem, {iconName: '', text: "Open in Finder"}), 
            React.createElement(core_1.MenuDivider, null), 
            React.createElement(core_1.MenuItem, {iconName: 'trash', text: "Delete"})));
    }
};
File = __decorate([
    mobx_react_1.observer,
    core_1.ContextMenuTarget
], File);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileList;
