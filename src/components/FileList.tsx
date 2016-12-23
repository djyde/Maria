import * as React from 'react'
import {
  ProgressBar,
  MenuDivider,
  ContextMenuTarget,
  Menu,
  MenuItem
} from '@blueprintjs/core'
import Row from './Row'
import Col from './Col'
import { IFile, FileStore } from '../stores/file.store'
import { observer } from 'mobx-react'

export interface IFileListProps {
  files: IFile[]
}

const FileList = ({ files }: IFileListProps) => {
  return (
    <div>
      {files.map(file => {
        const fileStore = new FileStore(file)
        return (
          <File key={fileStore.file.gid} fileStore={fileStore} />
        )
      })}
    </div>
  )
}

export interface IFileProps {
  fileStore: FileStore
}

@observer
@ContextMenuTarget
class File extends React.Component<IFileProps, {}> {
  render() {
    const { fileStore } = this.props
    return (
      <div className='file-item'>
        <Row>
          <Col>
            <div className='filename'>{fileStore.file.filename}</div>
          </Col>
          <Col>
            <div className='size'>- {fileStore.fileSize}</div>
          </Col>
        </Row>
        <Row>
          <Col span={1} className='progress-bar'>
            <ProgressBar value={fileStore.progress} />
          </Col>
        </Row>
      </div>
    )
  }

  renderContextMenu() {
    return (
      <Menu>
        <MenuItem iconName='' text="Open" />
        <MenuItem iconName='' text="Open in Finder" />
        <MenuDivider />
        <MenuItem iconName='trash' text="Delete" />
      </Menu>
    )
  }
}

export default FileList