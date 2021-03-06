import * as React from 'react'
import {
  Button,
  Intent,
  InputGroup
} from '@blueprintjs/core'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { remote } from 'electron'
import { globalStore } from '../stores/global.store'
import { aria2Store } from '../stores/aria2.store'
import { parseFileName } from '../stores/file.store'
import { createTask, getGlobalOption } from '../storage'
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
    // create Aria2 task
    const gid: string = await aria2Store.aria2.addUri(URL, { dir })
    // add to db
    URL.forEach(url => {
      createTask(gid, parseFileName(url), dir)
    })
    // refetch task list
    globalStore.getAllTasks()
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
        <InputGroup defaultValue={getGlobalOption().dir || aria2Store.globalOption.dir} inputRef={taskFormStore.savePathInputRef} rightElement={<Button onClick={taskFormStore.choosePath} iconName='folder-open'></Button>}/>
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
