"use strict";
const low = require('lowdb');
const fileSync = require('lowdb/lib/file-sync');
const { remote } = global.require('electron');
const path = global.require('path');
const userDataDir = remote.app.getPath('userData');
const dbPath = path.join(userDataDir, 'maria.db.json');
const db = new low(dbPath, { storage: fileSync });
const defaultOption = {
    global: {
        dir: '',
        notification: true
    },
    tasks: []
};
db.defaults(defaultOption).value();
function getAllTasks() {
    return db.get('tasks').value();
}
exports.getAllTasks = getAllTasks;
exports.getDBTaskByGID = (gid) => {
    return db.get('tasks').find({ gid }).value();
};
exports.createTask = (gid, filename, dir) => {
    const createdAt = Date.now().toString();
    const updatedAt = createdAt;
    db.get('tasks').push({
        gid,
        dir,
        filename,
        createdAt,
        updatedAt
    })
        .value();
};
exports.removeTask = (gid) => {
    db.get('tasks').remove({ gid }).value();
};
function setDefaultDir(dir) {
    const configDir = db.get('global.dir');
    if (configDir.value() === '') {
        db.set('global.dir', dir).value();
    }
}
exports.setDefaultDir = setDefaultDir;
function setDir(dir) {
    db.set('global.dir', dir).value();
}
exports.setDir = setDir;
function getGlobalOption() {
    return db.get('global').value();
}
exports.getGlobalOption = getGlobalOption;
function switchNotification(isOpen) {
    db.set('global.notification', isOpen).value();
}
exports.switchNotification = switchNotification;
function toggleNotification() {
    db.set('global.notification', !db.get('global.notification').value()).value();
}
exports.toggleNotification = toggleNotification;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = db;
