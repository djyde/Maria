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
import { aria2Store } from '../stores/aria2.store'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { shell } from 'electron'

export const FileList = observer(() => {
  return (
    <div>
      {aria2Store.locals.map(file => {
        return (
          <File key={file.gid} file={file} />
        )
      })}
    </div>
  )
})

export interface IFileProps {
  file: Aria2File
}

@observer
@ContextMenuTarget
export class File extends React.Component<IFileProps, {}> {

  private fileStore: FileStore

  componentWillMount() {
    this.fileStore = new FileStore(this.props.file)
  }

  render() {
    return (
      <div className='file-item' onDoubleClick={this.fileStore.onDoubleClickFile}>
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
            {this.fileStore.file.status === 'active' && <div className='speed'>- {this.fileStore.downloadSpeed}/s</div>}
          </Col>
        </Row>
      </div>
    )
  }

  renderContextMenu() {
    const openInFinder = () => {
      shell.showItemInFolder(this.fileStore.file.files[0].path)
    }
    return (
      <Menu>
        <MenuItem iconName='' text='Open' />
        <MenuItem iconName='' text='Open in Finder' onClick={openInFinder} />
        <MenuDivider />
        <MenuItem iconName='trash' text='Delete' />
      </Menu>
    )
  }
}

export default FileList