import * as React from 'react'
import {
  ProgressBar
} from '@blueprintjs/core'
import Row from './Row'
import Col from './Col'

export interface IFileListProps {
  files: IFile[]
}

const FileList = ({ files }: IFileListProps) => {
  return (
    <div>
      {files.map((file, i) => (
        <File key={i} file={file}></File>
      ))}
    </div>
  )
}

export enum DOWNLOAD_STATUS {
  PAUSE, DOWNLOADING, FINISHED
}

export interface IFile {
  filename: string,
  path: string,
  size: number,
  speed?: number,
  progress: number,
  source: string,
  status: DOWNLOAD_STATUS
}

export interface IFileProps {
  file: IFile
}

const File = ({ file }: IFileProps) => {
  return (
    <div className='file-item'>
      <Row>
        <Col>
          <div className='filename'>{file.filename}</div>
        </Col>
        <Col>
          <div className='size'>- {file.size}</div>
        </Col>
      </Row>
      <Row>
        <Col span={1} className='progress-bar'>
          <ProgressBar value={0.4} />
        </Col>
      </Row>
    </div>
  )
}

export default FileList