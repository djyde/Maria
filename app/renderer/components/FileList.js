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
const global_store_1 = require('../stores/global.store');
const RemoveConfirmDialog_1 = require('./RemoveConfirmDialog');
const mobx_react_1 = require('mobx-react');
const electron_1 = require('electron');
let FileList = class FileList extends React.Component {
    render() {
        if (global_store_1.globalStore.allTasks.length === 0) {
            return (React.createElement(Row_1.default, {style: { justifyContent: 'center', height: '100%' }}, 
                React.createElement(core_1.NonIdealState, {title: 'Task list is empty', description: 'Click to add new task', visual: React.createElement("div", {className: "pt-non-ideal-state-visual pt-non-ideal-state-icon"}, 
                    React.createElement("span", {className: "pt-icon pt-icon-download"})
                ), action: React.createElement(core_1.Button, {onClick: global_store_1.globalStore.openCreateTaskModal}, "新建任务")})
            ));
        }
        else {
            return (React.createElement("div", null, global_store_1.globalStore.allTasks.map(task => {
                return (React.createElement(File, {key: task.gid, gid: task.gid}));
            })));
        }
    }
};
FileList = __decorate([
    mobx_react_1.observer
], FileList);
let File = class File extends React.Component {
    componentWillMount() {
        this.fileStore = new file_store_1.FileStore(this.props.gid);
        this.removeConfirmStore = new RemoveConfirmDialog_1.RemoveConfirmStore(this.fileStore);
    }
    render() {
        return (React.createElement("div", {className: 'file-item', onDoubleClick: this.fileStore.onDoubleClickFile}, 
            React.createElement(RemoveConfirmDialog_1.default, {removeConfirmStore: this.removeConfirmStore}), 
            React.createElement(Row_1.default, null, 
                React.createElement(Col_1.default, null, 
                    React.createElement("div", {className: 'filename'}, this.fileStore.filename)
                )
            ), 
            React.createElement(Row_1.default, null, 
                React.createElement(Col_1.default, {span: 1, className: 'progress-bar'}, 
                    React.createElement(core_1.ProgressBar, {className: 'pt-no-stripes', intent: this.fileStore.progressBarIntent, value: this.fileStore.progress})
                )
            ), 
            React.createElement(Row_1.default, {style: { marginTop: '1em' }}, 
                React.createElement(Col_1.default, null, 
                    React.createElement("div", {className: 'size'}, this.fileStore.fileSize)
                ), 
                React.createElement(Col_1.default, null, this.fileStore.taskStatus === 'active' && React.createElement("div", {className: 'speed'}, 
                    "- ", 
                    this.fileStore.downloadSpeed, 
                    "/s")))));
    }
    renderContextMenu() {
        const openInFinder = () => {
            electron_1.shell.showItemInFolder(this.fileStore.fileDir);
        };
        return (React.createElement(core_1.Menu, null, 
            React.createElement(core_1.MenuItem, {iconName: '', text: 'Open'}), 
            React.createElement(core_1.MenuItem, {iconName: '', text: 'Open in Finder', onClick: openInFinder}), 
            React.createElement(core_1.MenuDivider, null), 
            React.createElement(core_1.MenuItem, {iconName: 'trash', text: 'Delete', onClick: this.removeConfirmStore.openDialog})));
    }
};
File = __decorate([
    mobx_react_1.observer,
    core_1.ContextMenuTarget
], File);
exports.File = File;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileList;
