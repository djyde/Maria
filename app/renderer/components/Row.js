"use strict";
const React = require('react');
class Row extends React.Component {
    render() {
        return (React.createElement("div", {className: this.props.className, style: { display: 'flex' }}, this.props.children));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Row;
