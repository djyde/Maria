import * as React from 'react'
import { observable, action, runInAction } from 'mobx'
import { observer } from 'mobx-react'
import {
  Dialog,
  Button,
  Checkbox,
  Intent
} from '@blueprintjs/core'
import { FileStore } from '../stores/file.store'
import Row from './Row'
import Col from './Col'
import { aria2Store } from '../stores/aria2.store'
import { globalStore } from '../stores/global.store'
import { removeTask } from '../storage'
const fs = global.require('fs')

export class RemoveConfirmStore {
  @observable isOpen = false
  @observable title = '删除任务'
  @observable isForceRemove = false

  constructor (private fileStore: FileStore) {
  }
8
  @action openDialog = () => {
    this.isOpen = true
  }

  @action closeDialog = () => {
    this.isOpen = false
  }

  @action toggleForceRemove = (e: React.FormEvent<HTMLInputElement>) => {
    this.isForceRemove = !this.isForceRemove
  }

  @action removeTask = async () => {
    // remove from Aria2
    await aria2Store.aria2.remove(this.fileStore.dbTaskFile.gid)
    // remove from db
    removeTask(this.fileStore.dbTaskFile.gid)
    runInAction('remove task successful', () => {
      this.closeDialog()
      // stop listen immediatly
      this.fileStore.stopListen(true)
      // refetch task list
      globalStore.getAllTasks()

      // remove file source
      if (this.isForceRemove && fs.existsSync(this.fileStore.filePath)) {
        fs.unlinkSync(this.fileStore.filePath)
        if (fs.existsSync(`${this.fileStore.filePath}.aria2`)) {
          fs.unlinkSync(`${this.fileStore.filePath}.aria2`)
        }
      }
    })
  }
}

export interface IRemoveConfirmDialogProps {
  removeConfirmStore: RemoveConfirmStore
}

const RemoveConfirmDialog = observer(({ removeConfirmStore }: IRemoveConfirmDialogProps) => {
  return (
    <Dialog
      isOpen={removeConfirmStore.isOpen}
      title={removeConfirmStore.title}
      onClose={removeConfirmStore.closeDialog}
      >
      <div className='pt-dialog-body'>
        <Row style={{ marginBottom: '1em' }}>确认删除任务?</Row>
        <Row>
          <Checkbox label='同时删除文件' onChange={removeConfirmStore.toggleForceRemove} checked={removeConfirmStore.isForceRemove} />
        </Row>
      </div>
      <div className='pt-dialog-footer'>
        <Row className='pt-dialog-footer-actions'>
          <Col span={8}>
          </Col>
          <Col>
            <Button intent={Intent.NONE} onClick={removeConfirmStore.closeDialog}>取消</Button>
          </Col>
          <Col>
            <Button intent={Intent.DANGER} onClick={removeConfirmStore.removeTask}>删除</Button>
          </Col>
        </Row>
      </div>
    </Dialog>
  )
})

export default RemoveConfirmDialog
