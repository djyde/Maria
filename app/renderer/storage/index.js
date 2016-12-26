"use strict";
const low = require('lowdb');
const fileSync = require('lowdb/lib/file-sync');
const { remote } = global.require('electron');
const path = global.require('path');
const userDataDir = remote.app.getPath('userData');
const dbPath = path.join(userDataDir, 'maria.db.json');
const db = new low(dbPath, { storage: fileSync });
db.defaults({
    tasks: []
}).value();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = db;
