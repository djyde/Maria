import * as React from 'react'
import {
  Button,
  Intent
} from '@blueprintjs/core'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { globalStore } from '../stores/global.store'
import { aria2Store } from '../stores/aria2.store'

export class TaskFormStore {
  private URLTextareaRef: HTMLTextAreaElement

  @action saveURLTextareaRef = (ref: HTMLTextAreaElement) => {
    this.URLTextareaRef = ref
  }

  @action onDownload = async () => {
    const URL = this.URLTextareaRef.value.split(',')
    const res = await aria2Store.aria2.addUri(URL)
    console.log(res)
    aria2Store.getLocals()
    this.URLTextareaRef.value = ''
    globalStore.closeCreateTaskModal()
  }
}

export const taskFormStore = new TaskFormStore()

const CreateTaskForm = ({ taskFormStore: TaskFormStore }) => {
  return (
    <div className='pt-dialog-body create-task-form'>
      <label className='pt-label'>
        URL:
        <textarea className='url-input pt-input' ref={taskFormStore.saveURLTextareaRef} dir='auto' placeholder='HTTP/FTP/SFTP/BitTorrent/Magnet... 用逗号分隔多个 URL'/>
      </label>
      <Button intent={Intent.PRIMARY} onClick={taskFormStore.onDownload}>Download</Button>
    </div>
  )
}

export default CreateTaskForm
