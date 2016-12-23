"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const mobx_1 = require('mobx');
function computedProgress(completed, total) {
    return parseFloat((completed / total).toFixed(3)) * 100;
}
exports.computedProgress = computedProgress;
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
    constructor(file) {
        this.startListen = () => {
        };
        this.setProgress = () => {
            this.file.completedLength += 1;
        };
        this.file = file;
        // setInterval(this.setProgress.bind(this), 1000)
    }
    get fileSize() {
        return '';
    }
    get progress() {
        return computedProgress(this.file.completedLength, this.file.totalLength);
    }
}
__decorate([
    mobx_1.observable
], FileStore.prototype, "file", void 0);
__decorate([
    mobx_1.action
], FileStore.prototype, "startListen", void 0);
__decorate([
    mobx_1.action
], FileStore.prototype, "setProgress", void 0);
__decorate([
    mobx_1.computed
], FileStore.prototype, "fileSize", null);
__decorate([
    mobx_1.computed
], FileStore.prototype, "progress", null);
exports.FileStore = FileStore;
