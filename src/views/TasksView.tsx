import * as React from 'react'
import FileList from '../components/FileList'
import { aria2Store, Aria2Status } from '../stores/aria2.store'
import { observer } from 'mobx-react'

@observer
class TasksView extends React.Component<{}, {}> {

  componentWillMount () {
    console.log('will')
  }

  render () {
    if (aria2Store.status === Aria2Status.OPENED) {
      return (<FileList />)
    } else {
      return <div>Disconnect</div>
    }
  }
}

export default TasksView
