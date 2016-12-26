"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const mobx_1 = require('mobx');
const storage_1 = require('../storage');
class GlobalStore {
    constructor() {
        this.createTaskModalVisible = false;
        this.allTasks = [];
        this.openCreateTaskModal = () => {
            this.createTaskModalVisible = true;
        };
        this.closeCreateTaskModal = () => {
            this.createTaskModalVisible = false;
        };
        this.getAllTasks = () => {
            this.allTasks = storage_1.getAllTasks();
        };
        this.getAllTasks();
    }
}
__decorate([
    mobx_1.observable
], GlobalStore.prototype, "createTaskModalVisible", void 0);
__decorate([
    mobx_1.observable
], GlobalStore.prototype, "allTasks", void 0);
__decorate([
    mobx_1.action
], GlobalStore.prototype, "openCreateTaskModal", void 0);
__decorate([
    mobx_1.action
], GlobalStore.prototype, "closeCreateTaskModal", void 0);
__decorate([
    mobx_1.action
], GlobalStore.prototype, "getAllTasks", void 0);
exports.GlobalStore = GlobalStore;
exports.globalStore = new GlobalStore();
