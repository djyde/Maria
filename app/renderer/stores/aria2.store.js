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
const mobx_1 = require('mobx');
const Aria2 = require('aria2');
const core_1 = require('@blueprintjs/core');
(function (Aria2Status) {
    Aria2Status[Aria2Status["WAITING"] = 0] = "WAITING";
    Aria2Status[Aria2Status["OPENED"] = 1] = "OPENED";
    Aria2Status[Aria2Status["CLOSED"] = 2] = "CLOSED";
    Aria2Status[Aria2Status["ERROR"] = 3] = "ERROR";
})(exports.Aria2Status || (exports.Aria2Status = {}));
var Aria2Status = exports.Aria2Status;
class Aria2Store {
    constructor(option) {
        this.status = Aria2Status.WAITING;
        this.waitings = [];
        this.actives = [];
        this.stoppeds = [];
        this.locals = [];
        this.getGlobalOption = () => __awaiter(this, void 0, void 0, function* () {
            const options = yield this.aria2.getGlobalOption();
            mobx_1.runInAction('get global option success', () => {
                this.globalOption = options;
            });
        });
        this.getLocals = () => __awaiter(this, void 0, void 0, function* () {
            const actives = yield this.aria2.tellActive();
            const waitings = yield this.aria2.tellWaiting(0, 10);
            mobx_1.runInAction('set local', () => {
                this.locals = [].concat(actives, waitings);
            });
        });
        this.getActive = () => __awaiter(this, void 0, void 0, function* () {
            if (this.status === Aria2Status.OPENED) {
                const actives = yield this.aria2.tellActive();
                mobx_1.runInAction('set actives', () => {
                    this.actives = actives;
                });
            }
        });
        this.getWaiting = (offset = 0, num = 10) => __awaiter(this, void 0, void 0, function* () {
            if (this.status === Aria2Status.OPENED) {
                const waitings = yield this.aria2.tellWaiting(offset, num);
                mobx_1.runInAction('set waitings', () => {
                    this.waitings = waitings;
                });
            }
        });
        this.getStopped = (offset = 0, num = 10) => __awaiter(this, void 0, void 0, function* () {
            if (this.status === Aria2Status.OPENED) {
                const stoppeds = yield this.aria2.tellStopped(offset, num);
                mobx_1.runInAction('set stopped', () => {
                    this.stoppeds = stoppeds;
                });
            }
        });
        this.aria2 = new Aria2(option);
        this.aria2.open();
        this.aria2.onopen = () => {
            this.status = Aria2Status.OPENED;
            core_1.Toaster.create().show({ message: 'Aria2 connect success' });
            this.getLocals();
            this.getGlobalOption();
        };
        this.aria2.onclose = () => {
            this.status = Aria2Status.CLOSED;
            core_1.Toaster.create().show({ message: 'Aria2 connect error' });
        };
    }
}
__decorate([
    mobx_1.observable
], Aria2Store.prototype, "status", void 0);
__decorate([
    mobx_1.observable
], Aria2Store.prototype, "waitings", void 0);
__decorate([
    mobx_1.observable
], Aria2Store.prototype, "actives", void 0);
__decorate([
    mobx_1.observable
], Aria2Store.prototype, "stoppeds", void 0);
__decorate([
    mobx_1.observable
], Aria2Store.prototype, "globalOption", void 0);
__decorate([
    mobx_1.observable
], Aria2Store.prototype, "locals", void 0);
__decorate([
    mobx_1.action
], Aria2Store.prototype, "getGlobalOption", void 0);
__decorate([
    mobx_1.action
], Aria2Store.prototype, "getLocals", void 0);
__decorate([
    mobx_1.action
], Aria2Store.prototype, "getActive", void 0);
__decorate([
    mobx_1.action
], Aria2Store.prototype, "getWaiting", void 0);
__decorate([
    mobx_1.action
], Aria2Store.prototype, "getStopped", void 0);
exports.Aria2Store = Aria2Store;
exports.aria2Store = new Aria2Store({
    host: 'localhost',
    port: 6800,
    path: '/jsonrpc'
});
