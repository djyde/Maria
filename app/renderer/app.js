"use strict";
const React = require('react');
const react_dom_1 = require('react-dom');
const mobx_react_1 = require('mobx-react');
const mobx_1 = require('mobx');
const core_1 = require('@blueprintjs/core');
const FileList_1 = require('./components/FileList');
const aria2_store_1 = require('./stores/aria2.store');
const global_store_1 = require('./stores/global.store');
const CreateTaskModal_1 = require('./components/CreateTaskModal');
const mobx_react_devtools_1 = require('mobx-react-devtools');
mobx_1.useStrict(true);
const App = mobx_react_1.observer(() => {
    return (React.createElement("div", {className: 'pt-app pt-dark'}, 
        React.createElement(mobx_react_devtools_1.default, null), 
        React.createElement(CreateTaskModal_1.default, null), 
        React.createElement("nav", {id: 'navbar', className: 'pt-navbar draggable'}, 
            React.createElement("div", {className: 'pt-navbar-group pt-align-left'}, 
                React.createElement("div", {className: 'pt-navbar-heading'})
            ), 
            React.createElement("div", {className: 'pt-navbar-group pt-align-right'}, 
                React.createElement("button", {className: 'pt-button pt-minimal pt-icon-add', onClick: global_store_1.globalStore.openCreateTaskModal})
            )), 
        React.createElement("section", {id: 'container'}, 
            React.createElement("div", {id: 'sidebar'}, 
                React.createElement(SideMenu, null)
            ), 
            React.createElement("div", {id: 'content'}, aria2_store_1.aria2Store.status === aria2_store_1.Aria2Status.OPENED ? React.createElement(FileList_1.default, null) : React.createElement("div", null, "Disconnect")))));
});
const SideMenu = () => {
    return (React.createElement(core_1.Menu, null, 
        React.createElement(core_1.MenuDivider, {title: 'Task'}), 
        React.createElement(core_1.MenuItem, {iconName: 'inbox', text: 'All'}), 
        React.createElement(core_1.MenuItem, {iconName: 'download', text: 'Downloading'}), 
        React.createElement(core_1.MenuItem, {iconName: 'tick', text: 'Finished'}), 
        React.createElement(core_1.MenuDivider, null), 
        React.createElement(core_1.MenuItem, {iconName: 'settings', text: 'Setting'})));
};
react_dom_1.render(React.createElement(App, null), document.querySelector('#app'));
