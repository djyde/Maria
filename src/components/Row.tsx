import * as React from 'react'

export interface IRowProps {
  children?: JSX.Element,
  className?: string
}

export default class Row extends React.Component<IRowProps, {}> {
  render () {
    return (
      <div className={this.props.className} style={{display: 'flex'}}>
        {this.props.children}
      </div>
    )
  }
}