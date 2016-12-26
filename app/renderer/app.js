"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const react_dom_1 = require('react-dom');
const mobx_react_1 = require('mobx-react');
const mobx_1 = require('mobx');
const core_1 = require('@blueprintjs/core');
const global_store_1 = require('./stores/global.store');
const CreateTaskModal_1 = require('./components/CreateTaskModal');
const mobx_react_devtools_1 = require('mobx-react-devtools');
const react_router_1 = require('react-router');
const TasksView_1 = require('./views/TasksView');
const SettingsView_1 = require('./views/SettingsView');
mobx_1.useStrict(true);
const Entry = () => {
    return (React.createElement(react_router_1.Router, {history: react_router_1.hashHistory}, 
        React.createElement(react_router_1.Route, {path: '/', component: App}, 
            React.createElement(react_router_1.Route, {path: '/tasks', component: TasksView_1.default}), 
            React.createElement(react_router_1.Route, {path: '/settings', component: SettingsView_1.default}))
    ));
};
let App = class App extends React.Component {
    componentWillMount() {
    }
    render() {
        return (React.createElement("div", {className: 'pt-app'}, 
            React.createElement(mobx_react_devtools_1.default, null), 
            React.createElement(CreateTaskModal_1.default, null), 
            React.createElement("nav", {id: 'navbar', className: 'pt-navbar draggable pt-dark'}, 
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
                React.createElement("div", {id: 'content', className: 'pt-light'}, this.props.children))));
    }
};
App = __decorate([
    mobx_react_1.observer
], App);
const SideMenu = () => {
    return (React.createElement(core_1.Menu, {className: 'pt-dark'}, 
        React.createElement(core_1.MenuDivider, {title: 'Task'}), 
        React.createElement(react_router_1.Link, {to: 'tasks', className: 'pt-menu-item pt-icon-inbox'}, "All"), 
        React.createElement(core_1.MenuItem, {iconName: 'download', text: 'Downloading'}), 
        React.createElement(core_1.MenuItem, {iconName: 'tick', text: 'Finished'}), 
        React.createElement(core_1.MenuDivider, null), 
        React.createElement(react_router_1.Link, {to: 'settings', className: 'pt-menu-item pt-icon-settings'}, "Settings")));
};
react_dom_1.render(React.createElement(Entry, null), document.querySelector('#app'));
