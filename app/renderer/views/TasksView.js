"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const FileList_1 = require('../components/FileList');
const mobx_react_1 = require('mobx-react');
let TasksView = class TasksView extends React.Component {
    componentWillMount() {
    }
    render() {
        return (React.createElement(FileList_1.default, null));
    }
};
TasksView = __decorate([
    mobx_react_1.observer
], TasksView);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TasksView;
