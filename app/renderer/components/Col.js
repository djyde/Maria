"use strict";
const React = require('react');
class Col extends React.Component {
    render() {
        return (React.createElement("div", {className: this.props.className, style: Object.assign({}, this.props.style, { flex: this.props.span })}, this.props.children));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Col;
