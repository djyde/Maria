"use strict";
const React = require('react');
const react_dom_1 = require('react-dom');
const core_1 = require('@blueprintjs/core');
const FileList_1 = require('./components/FileList');
const file_store_1 = require('./stores/file.store');
const files = [
    { filename: 'Foo.jpg', path: '/path/to', status: file_store_1.DOWNLOAD_STATUS.COMPLETE, source: 'https://github.com/egoist/observer/archive/master.zip', gid: 'foo', totalLength: 10000, completedLength: 100, downloadSpeed: 200 },
    { filename: 'Bar.jpg', path: '/path/to/bar', status: file_store_1.DOWNLOAD_STATUS.PAUSED, source: 'https://github.com/egoist/observer/archive/master.zip', gid: 'bar', totalLength: 1000, completedLength: 2, downloadSpeed: 200 }
];
const App = () => {
    return (React.createElement("div", {className: 'pt-app pt-dark'}, 
        React.createElement("nav", {id: 'navbar', className: 'pt-navbar draggable'}, 
            React.createElement("div", {className: 'pt-navbar-group pt-align-left'}, 
                React.createElement("div", {className: 'pt-navbar-heading'})
            ), 
            React.createElement("div", {className: 'pt-navbar-group pt-align-right'}, 
                React.createElement("button", {className: 'pt-button pt-minimal pt-icon-cog'})
            )), 
        React.createElement("section", {id: 'container'}, 
            React.createElement("div", {id: 'sidebar'}, 
                React.createElement(SideMenu, null)
            ), 
            React.createElement("div", {id: 'content'}, 
                React.createElement(FileList_1.default, {files: files})
            ))));
};
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
