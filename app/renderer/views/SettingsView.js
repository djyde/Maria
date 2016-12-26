"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const storage_1 = require('../storage');
const core_1 = require('@blueprintjs/core');
const mobx_react_1 = require('mobx-react');
const electron_1 = require('electron');
const { dialog } = electron_1.remote;
class SettingsViewStore {
    constructor() {
        this.notifySaveChange = () => {
            // const toaster = Toaster.create()
            // toaster.show({ message: 'Change save!', intent: Intent.SUCCESS})
        };
        this.savePathInputRef = (ref) => {
            this.pathInputRef = ref;
        };
        this.choosePath = () => {
            dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory'], defaultPath: this.pathInputRef.value }, (paths) => {
                if (paths) {
                    this.pathInputRef.value = paths[0];
                    storage_1.setDir(this.pathInputRef.value);
                    this.notifySaveChange();
                }
            });
        };
        this.toggleNotification = () => {
            storage_1.toggleNotification();
            this.notifySaveChange();
        };
    }
}
exports.SettingsViewStore = SettingsViewStore;
exports.settingsViewStore = new SettingsViewStore();
let SettingsView = class SettingsView extends React.Component {
    render() {
        return (React.createElement("div", {id: 'settings-view'}, 
            React.createElement("h6", {className: 'title'}, "Settings"), 
            React.createElement("div", {style: { marginLeft: '2em' }}, 
                React.createElement("label", {className: 'pt-label pt-inline'}, 
                    "下载目录", 
                    React.createElement(core_1.InputGroup, {disabled: true, defaultValue: storage_1.getGlobalOption().dir, inputRef: exports.settingsViewStore.savePathInputRef, rightElement: React.createElement(core_1.Button, {iconName: 'folder-open', className: 'pt-minimal', onClick: exports.settingsViewStore.choosePath})})), 
                React.createElement(core_1.Checkbox, {label: '任务完成后通知', defaultChecked: storage_1.getGlobalOption().notification, onChange: exports.settingsViewStore.toggleNotification}))));
    }
};
SettingsView = __decorate([
    mobx_react_1.observer
], SettingsView);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SettingsView;
