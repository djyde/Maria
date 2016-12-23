"use strict";
const React = require('react');
const core_1 = require('@blueprintjs/core');
const mobx_react_1 = require('mobx-react');
const global_store_1 = require('../stores/global.store');
const CreateTaskForm_1 = require('./CreateTaskForm');
const CreateTaskModal = mobx_react_1.observer(() => {
    return (React.createElement(core_1.Dialog, {isOpen: global_store_1.globalStore.createTaskModalVisible, canOutsideClickClose: true, onClose: global_store_1.globalStore.closeCreateTaskModal, title: 'Create task'}, 
        React.createElement(CreateTaskForm_1.default, null)
    ));
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateTaskModal;
