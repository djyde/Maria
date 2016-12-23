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
const core_1 = require('@blueprintjs/core');
const mobx_1 = require('mobx');
const global_store_1 = require('../stores/global.store');
const aria2_store_1 = require('../stores/aria2.store');
class TaskFormStore {
    constructor() {
        this.saveURLTextareaRef = (ref) => {
            this.URLTextareaRef = ref;
        };
        this.onDownload = () => __awaiter(this, void 0, void 0, function* () {
            const URL = this.URLTextareaRef.value.split(',');
            const res = yield aria2_store_1.aria2Store.aria2.addUri(URL);
            console.log(res);
            aria2_store_1.aria2Store.getLocals();
            this.URLTextareaRef.value = '';
            global_store_1.globalStore.closeCreateTaskModal();
        });
    }
}
__decorate([
    mobx_1.action
], TaskFormStore.prototype, "saveURLTextareaRef", void 0);
__decorate([
    mobx_1.action
], TaskFormStore.prototype, "onDownload", void 0);
exports.TaskFormStore = TaskFormStore;
exports.taskFormStore = new TaskFormStore();
const CreateTaskForm = ({ taskFormStore: TaskFormStore }) => {
    return (React.createElement("div", {className: 'pt-dialog-body create-task-form'}, 
        React.createElement("label", {className: 'pt-label'}, 
            "URL:", 
            React.createElement("textarea", {className: 'url-input pt-input', ref: exports.taskFormStore.saveURLTextareaRef, dir: 'auto', placeholder: 'HTTP/FTP/SFTP/BitTorrent/Magnet... 用逗号分隔多个 URL'})), 
        React.createElement(core_1.Button, {intent: core_1.Intent.PRIMARY, onClick: exports.taskFormStore.onDownload}, "Download")));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateTaskForm;
