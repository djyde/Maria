"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const React = require('react');
const mobx_1 = require('mobx');
const mobx_react_1 = require('mobx-react');
const core_1 = require('@blueprintjs/core');
const Row_1 = require('./Row');
const Col_1 = require('./Col');
const aria2_store_1 = require('../stores/aria2.store');
const fs = global.require('fs');
class RemoveConfirmStore {
    constructor(fileStore) {
        this.fileStore = fileStore;
        this.isOpen = false;
        this.title = '删除任务';
        this.isForceRemove = false;
        this.openDialog = () => {
            this.isOpen = true;
        };
        this.closeDialog = () => {
            this.isOpen = false;
        };
        this.toggleForceRemove = (e) => {
            this.isForceRemove = !this.isForceRemove;
        };
        this.removeTask = () => __awaiter(this, void 0, void 0, function* () {
            yield aria2_store_1.aria2Store.aria2.remove(this.fileStore.file.gid);
            mobx_1.runInAction('remove task successful', () => {
                this.closeDialog();
                // stop listen immediatly
                this.fileStore.stopListen(true);
                // refetch task list
                aria2_store_1.aria2Store.getLocals();
                // remove file source
                if (this.isForceRemove && fs.existsSync(this.fileStore.file.files[0].path)) {
                    fs.unlinkSync(this.fileStore.file.files[0].path);
                    fs.unlinkSync(`${this.fileStore.file.files[0].path}.aria2`);
                }
            });
        });
    }
}
__decorate([
    mobx_1.observable
], RemoveConfirmStore.prototype, "isOpen", void 0);
__decorate([
    mobx_1.observable
], RemoveConfirmStore.prototype, "title", void 0);
__decorate([
    mobx_1.observable
], RemoveConfirmStore.prototype, "isForceRemove", void 0);
__decorate([
    mobx_1.action
], RemoveConfirmStore.prototype, "openDialog", void 0);
__decorate([
    mobx_1.action
], RemoveConfirmStore.prototype, "closeDialog", void 0);
__decorate([
    mobx_1.action
], RemoveConfirmStore.prototype, "toggleForceRemove", void 0);
__decorate([
    mobx_1.action
], RemoveConfirmStore.prototype, "removeTask", void 0);
exports.RemoveConfirmStore = RemoveConfirmStore;
const RemoveConfirmDialog = mobx_react_1.observer(({ removeConfirmStore }) => {
    return (React.createElement(core_1.Dialog, {isOpen: removeConfirmStore.isOpen, title: removeConfirmStore.title, onClose: removeConfirmStore.closeDialog}, 
        React.createElement("div", {className: 'pt-dialog-body'}, 
            React.createElement(Row_1.default, {style: { marginBottom: '1em' }}, "确认删除任务?"), 
            React.createElement(Row_1.default, null, 
                React.createElement(core_1.Checkbox, {label: '同时删除文件', onChange: removeConfirmStore.toggleForceRemove, checked: removeConfirmStore.isForceRemove})
            )), 
        React.createElement("div", {className: 'pt-dialog-footer'}, 
            React.createElement(Row_1.default, {className: 'pt-dialog-footer-actions'}, 
                React.createElement(Col_1.default, {span: 8}), 
                React.createElement(Col_1.default, null, 
                    React.createElement(core_1.Button, {intent: core_1.Intent.NONE, onClick: removeConfirmStore.closeDialog}, "取消")
                ), 
                React.createElement(Col_1.default, null, 
                    React.createElement(core_1.Button, {intent: core_1.Intent.DANGER, onClick: removeConfirmStore.removeTask}, "删除")
                ))
        )));
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RemoveConfirmDialog;
