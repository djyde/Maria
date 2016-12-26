import * as React from 'react'
import {
  ProgressBar,
  MenuDivider,
  ContextMenuTarget,
  Menu,
  MenuItem,
} from '@blueprintjs/core'
import Row from './Row'
import Col from './Col'
import { FileStore } from '../stores/file.store'
import { globalStore } from '../stores/global.store'
import { ITaskFile } from '../storage'
import RemoveConfirmDialog, { RemoveConfirmStore } from './RemoveConfirmDialog'
import { observer } from 'mobx-react'
import { shell } from 'electron'

@observer
class FileList extends React.Component<{}, {}> {
  render () {
    return (
      <div>
        {globalStore.allTasks.map(task => {
          return (
            <File key={task.gid} gid={task.gid} />
          )
        })}
      </div>
    )
  }
}

export interface IFileProps {
  gid: string
}

@observer
@ContextMenuTarget
export class File extends React.Component<IFileProps, {}> {

  private fileStore: FileStore
  private removeConfirmStore: RemoveConfirmStore

  componentWillMount() {
    this.fileStore = new FileStore(this.props.gid)
    this.removeConfirmStore = new RemoveConfirmStore(this.fileStore)
  }

  render() {
    return (
      <div className='file-item' onDoubleClick={this.fileStore.onDoubleClickFile}>
        <RemoveConfirmDialog removeConfirmStore={this.removeConfirmStore} />
        <Row>
          <Col>
            <div className='filename'>{this.fileStore.filename}</div>
          </Col>
        </Row>
        <Row>
          <Col span={1} className='progress-bar'>
            <ProgressBar className={'pt-no-stripes'} intent={this.fileStore.progressBarIntent} value={this.fileStore.progress} />
          </Col>
        </Row>
        <Row style={{ marginTop: '1em' }}>
          <Col>
            <div className='size'>{this.fileStore.fileSize}</div>
          </Col>
          <Col>
            {this.fileStore.taskStatus === 'active' && <div className='speed'>- {this.fileStore.downloadSpeed}/s</div>}
          </Col>
        </Row>
      </div>
    )
  }

  renderContextMenu() {
    const openInFinder = () => {
      shell.showItemInFolder(this.fileStore.fileDir)
    }
    return (
      <Menu>
        <MenuItem iconName='' text='Open' />
        <MenuItem iconName='' text='Open in Finder' onClick={openInFinder} />
        <MenuDivider />
        <MenuItem iconName='trash' text='Delete' onClick={this.removeConfirmStore.openDialog} />
      </Menu>
    )
  }
}

export default FileList