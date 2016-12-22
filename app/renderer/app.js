"use strict";
const React = require('react');
const react_dom_1 = require('react-dom');
const Demo_1 = require('./components/Demo');
const App = () => {
    return React.createElement("div", null, 
        "It works! ", 
        React.createElement(Demo_1.default, null));
};
react_dom_1.render(React.createElement(App, null), document.querySelector('#app'));
