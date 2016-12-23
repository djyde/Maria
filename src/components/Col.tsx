import * as React from 'react'

export interface IColProps {
  children?: JSX.Element,
  span?: number | string,
  className?: string
}

export default class Col extends React.Component<IColProps, {}> {
  render () {
    return (
      <div className={this.props.className} style={{flex: this.props.span}}>
        {this.props.children}
      </div>
    )
  }
}