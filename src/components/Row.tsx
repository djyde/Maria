import * as React from 'react'

export interface IRowProps {
  children?: JSX.Element,
  className?: string,
  style?: React.CSSProperties
}

export default class Row extends React.Component<IRowProps, {}> {
  render () {
    return (
      <div className={this.props.className} style={Object.assign({}, this.props.style, {display: 'flex'})}>
        {this.props.children}
      </div>
    )
  }
}