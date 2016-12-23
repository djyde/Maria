"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const mobx_1 = require('mobx');
const aria2_1 = require('aria2');
class GlobalStore {
    constructor(aria2) {
        this.aria2 = aria2;
    }
}
__decorate([
    mobx_1.observable
], GlobalStore.prototype, "version", void 0);
exports.GlobalStore = GlobalStore;
exports.aria2 = new aria2_1.default({
    host: 'localhost',
    port: 6800,
    path: '/jsonrpc'
});
exports.globalStore = new GlobalStore(exports.aria2);
