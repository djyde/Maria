import * as React from 'react'
import {
  Button,
  Intent
} from '@blueprintjs/core'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { remote } from 'electron'
import { globalStore } from '../stores/global.store'
import { aria2Store } from '../stores/aria2.store'
import Row from './Row'
import Col from './Col'

const { dialog } = remote

export class TaskFormStore {
  private URLTextareaRef: HTMLTextAreaElement
  private pathInputRef: HTMLInputElement

  @action saveURLTextareaRef = (ref: HTMLTextAreaElement) => {
    this.URLTextareaRef = ref
  }

  @action savePathInputRef = (ref: HTMLInputElement) => {
    this.pathInputRef = ref
  }

  @action onDownload = async () => {
    const URL = this.URLTextareaRef.value.split(',')
    const dir = this.pathInputRef.value
    const res = await aria2Store.aria2.addUri(URL, { dir })
    // refetch task list
    aria2Store.getLocals()
    // close modal
    globalStore.closeCreateTaskModal()
  }

  @action choosePath = () => {
    dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory'], defaultPath: this.pathInputRef.value }, (paths: string | undefined) => {
      if (paths) {
        this.pathInputRef.value = paths[0]
      }
    })
  }
}

export const taskFormStore = new TaskFormStore()

const CreateTaskForm = ({ taskFormStore: TaskFormStore }) => {
  return (
    <div className='pt-dialog-body create-task-form'>
      <label className="pt-label">
        Path:
        <Row>
          <Col span={11}>
            <input defaultValue={aria2Store.globalOption.dir} ref={taskFormStore.savePathInputRef} className='pt-input' />
          </Col>
          <Col span={1}>
            <Button onClick={taskFormStore.choosePath} style={{ marginTop: '5px', marginLeft: '8px' }} iconName='folder-open'></Button>
          </Col>
        </Row>
      </label>
      <label className='pt-label'>
        URL:
        <textarea className='url-input pt-input' ref={taskFormStore.saveURLTextareaRef} dir='auto' placeholder='HTTP/FTP/SFTP/BitTorrent/Magnet... 用逗号分隔多个 URL' />
      </label>
      <Button intent={Intent.PRIMARY} onClick={taskFormStore.onDownload}>Download</Button>
    </div>
  )
}

export default CreateTaskForm
