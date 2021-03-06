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
const aria2_store_1 = require('../stores/aria2.store');
const storage_1 = require('../storage');
const path = global.require('path');
const core_1 = require('@blueprintjs/core');
function computedProgress(completed, total) {
    if (completed === 0 || total === 0) {
        return 0;
    }
    else {
        return parseFloat((completed / total).toFixed(3));
    }
}
exports.computedProgress = computedProgress;
function toFixed(num, count = 2) {
    return num.toFixed(count);
}
exports.toFixed = toFixed;
function parseSize(byte, hex = 1000) {
    const byteNum = Number(byte);
    if (byteNum < hex) {
        return `${toFixed(byteNum, 1)}B`;
    }
    else if (byteNum > hex && byteNum < hex * hex) {
        return `${toFixed(byteNum / hex, 1)}KB`;
    }
    else if (byteNum > hex * hex) {
        return `${toFixed(byteNum / hex / hex, 1)}MB`;
    }
    else {
        return `${toFixed(byteNum / hex / hex / hex, 1)}GB`;
    }
}
exports.parseSize = parseSize;
function parseFileName(path) {
    return path.split('/')[path.split('/').length - 1];
}
exports.parseFileName = parseFileName;
(function (DOWNLOAD_STATUS) {
    DOWNLOAD_STATUS[DOWNLOAD_STATUS["WAITING"] = 0] = "WAITING";
    DOWNLOAD_STATUS[DOWNLOAD_STATUS["PAUSED"] = 1] = "PAUSED";
    DOWNLOAD_STATUS[DOWNLOAD_STATUS["ACTIVE"] = 2] = "ACTIVE";
    DOWNLOAD_STATUS[DOWNLOAD_STATUS["ERROR"] = 3] = "ERROR";
    DOWNLOAD_STATUS[DOWNLOAD_STATUS["COMPLETE"] = 4] = "COMPLETE";
    DOWNLOAD_STATUS[DOWNLOAD_STATUS["REMOVED"] = 5] = "REMOVED";
})(exports.DOWNLOAD_STATUS || (exports.DOWNLOAD_STATUS = {}));
var DOWNLOAD_STATUS = exports.DOWNLOAD_STATUS;
class FileStore {
    constructor(gid) {
        this.gid = gid;
        this.isNotFound = true;
        this.setDBTask = (task) => {
            this.dbTaskFile = task;
        };
        this.onDoubleClickFile = () => {
            if (this.isNotFound) {
                // TODO: re-download task
                return;
            }
            if (this.aria2File.status !== 'active') {
                this.start();
            }
            else {
                this.pause();
            }
        };
        this.start = () => __awaiter(this, void 0, void 0, function* () {
            yield aria2_store_1.aria2Store.aria2.unpause(this.dbTaskFile.gid);
            this.startListen();
        });
        this.pause = () => __awaiter(this, void 0, void 0, function* () {
            // TODO: prevent aria2File is null
            yield aria2_store_1.aria2Store.aria2.pause(this.aria2File.gid);
            this.stopListen();
        });
        this.remove = () => __awaiter(this, void 0, void 0, function* () {
            if (this.isNotFound) {
                // TODO: remove source file
                return;
            }
            yield aria2_store_1.aria2Store.aria2.remove(this.aria2File.gid);
            this.stopListen(true);
            // aria2Store.getLocals()
        });
        this.startListen = (delay = 1000) => {
            const listenTask = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const file = yield aria2_store_1.aria2Store.aria2.tellStatus(this.gid);
                    mobx_1.runInAction(`listen task ${this.gid} successful`, () => {
                        this.aria2File = file;
                        this.isNotFound = false;
                    });
                }
                catch (e) {
                    const err = e;
                    mobx_1.runInAction(`listen task ${this.gid} failed`, () => {
                        if (err.message.match('not found')) {
                            this.isNotFound = true;
                            this.stopListen();
                        }
                    });
                }
            });
            listenTask();
            this.interval = setInterval(listenTask, delay);
        };
        this.stopListen = (immediatly = false) => {
            if (immediatly) {
                clearInterval(this.interval);
            }
            else {
                setTimeout(() => {
                    clearInterval(this.interval);
                }, 1000);
            }
        };
        this.setDBTask(storage_1.getDBTaskByGID(gid));
        this.startListen();
    }
    get progressBarIntent() {
        if (this.isNotFound) {
            return core_1.Intent.NONE;
        }
        switch (this.aria2File.status) {
            case 'active':
                return core_1.Intent.SUCCESS;
            case 'paused':
            case 'waiting':
            case 'removed':
                return core_1.Intent.NONE;
            case 'error':
                return core_1.Intent.DANGER;
            default:
                return core_1.Intent.NONE;
        }
    }
    get filename() {
        if (!this.isNotFound) {
            return parseFileName(this.aria2File.files[0].path);
        }
        else {
            return this.dbTaskFile.filename;
        }
    }
    get fileSize() {
        if (this.isNotFound) {
            return parseSize(0);
        }
        else {
            return parseSize(this.aria2File.totalLength);
        }
    }
    get downloadSpeed() {
        if (this.isNotFound) {
            return parseSize(0);
        }
        else {
            return parseSize(this.aria2File.downloadSpeed);
        }
    }
    get progress() {
        if (this.isNotFound) {
            return computedProgress(0, 0);
        }
        else {
            return computedProgress(Number(this.aria2File.completedLength), Number(this.aria2File.totalLength));
        }
    }
    get taskStatus() {
        if (this.isNotFound) {
            return 'paused';
        }
        else {
            return this.aria2File.status;
        }
    }
    get fileDir() {
        if (this.isNotFound) {
            return this.dbTaskFile.dir;
        }
        else {
            return this.aria2File.dir;
        }
    }
    get filePath() {
        if (this.isNotFound) {
            return path.join(this.dbTaskFile.dir, this.dbTaskFile.filename);
        }
        else {
            return this.aria2File.files[0].path;
        }
    }
}
__decorate([
    mobx_1.observable
], FileStore.prototype, "aria2File", void 0);
__decorate([
    mobx_1.observable
], FileStore.prototype, "dbTaskFile", void 0);
__decorate([
    mobx_1.observable
], FileStore.prototype, "isNotFound", void 0);
__decorate([
    mobx_1.action
], FileStore.prototype, "setDBTask", void 0);
__decorate([
    mobx_1.computed
], FileStore.prototype, "progressBarIntent", null);
__decorate([
    mobx_1.action
], FileStore.prototype, "onDoubleClickFile", void 0);
__decorate([
    mobx_1.action
], FileStore.prototype, "start", void 0);
__decorate([
    mobx_1.action
], FileStore.prototype, "pause", void 0);
__decorate([
    mobx_1.action
], FileStore.prototype, "remove", void 0);
__decorate([
    mobx_1.action
], FileStore.prototype, "startListen", void 0);
__decorate([
    mobx_1.action
], FileStore.prototype, "stopListen", void 0);
__decorate([
    mobx_1.computed
], FileStore.prototype, "filename", null);
__decorate([
    mobx_1.computed
], FileStore.prototype, "fileSize", null);
__decorate([
    mobx_1.computed
], FileStore.prototype, "downloadSpeed", null);
__decorate([
    mobx_1.computed
], FileStore.prototype, "progress", null);
__decorate([
    mobx_1.computed
], FileStore.prototype, "taskStatus", null);
__decorate([
    mobx_1.computed
], FileStore.prototype, "fileDir", null);
__decorate([
    mobx_1.computed
], FileStore.prototype, "filePath", null);
exports.FileStore = FileStore;
