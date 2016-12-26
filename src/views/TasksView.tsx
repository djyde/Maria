import * as React from 'react'
import FileList from '../components/FileList'
import { aria2Store, Aria2Status } from '../stores/aria2.store'
import { observer } from 'mobx-react'

@observer
class TasksView extends React.Component<{}, {}> {

  componentWillMount () {
  }

  render () {
    return (
      <FileList />
    )
  }
}

export default TasksView
