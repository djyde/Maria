import { observable, action, computed, runInAction } from 'mobx'
import { aria2Store, Aria2Status } from '../stores/aria2.store'
import { ITaskFile, getDBTaskByGID } from '../storage'
import {
  Intent
} from '@blueprintjs/core'

export function computedProgress(completed: number, total: number) {
  if (completed === 0 || total === 0) {
    return 0
  } else {
    return parseFloat((completed / total).toFixed(3))
  }
}

export function toFixed(num: number, count: number = 2) {
  return num.toFixed(count)
}

export function parseSize(byte: string | number, hex: number = 1000): string {
  const byteNum = Number(byte)
  if (byteNum < hex) {
    return `${toFixed(byteNum, 1)}B`
  } else if (byteNum > hex && byteNum < hex * hex) {
    return `${toFixed(byteNum / hex, 1)}KB`
  } else if (byteNum > hex * hex) {
    return `${toFixed(byteNum / hex / hex, 1)}MB`
  } else {
    return `${toFixed(byteNum / hex / hex / hex, 1)}GB`
  }
}

export function parseFileName(path: string) {
  return path.split('/')[path.split('/').length - 1]
}

export enum DOWNLOAD_STATUS {
  WAITING, PAUSED, ACTIVE, ERROR, COMPLETE, REMOVED
}

export class FileStore {
  private interval: number
  @observable aria2File: Aria2File
  @observable dbTaskFile: ITaskFile
  @observable isNotFound: boolean = true

  constructor(private gid: string) {
    this.setDBTask(getDBTaskByGID(gid))
    this.startListen()
  }

  @action setDBTask = (task: ITaskFile) => {
    this.dbTaskFile = task
  }

  @computed get progressBarIntent(): Intent {
    if (this.isNotFound) {
      return Intent.NONE
    }
    switch (this.aria2File.status) {
      case 'active':
        return Intent.SUCCESS
      case 'paused':
      case 'waiting':
      case 'removed':
        return Intent.NONE
      case 'error':
        return Intent.DANGER
      default:
        return Intent.NONE
    }
  }

  @action onDoubleClickFile = () => {
    if (this.isNotFound) {
      // TODO: re-download task
      return
    }
    if (this.aria2File.status !== 'active') {
      this.start()
    } else {
      this.pause()
    }
  }

  @action start = async () => {
    await aria2Store.aria2.unpause(this.dbTaskFile.gid)
    this.startListen()
  }

  @action pause = async () => {
    // TODO: prevent aria2File is null
    await aria2Store.aria2.pause(this.aria2File.gid)
    this.stopListen()
  }

  @action remove = async () => {
    if (this.isNotFound) {
      // TODO: remove source file
      return
    }
    await aria2Store.aria2.remove(this.aria2File.gid)
    this.stopListen(true)
    // aria2Store.getLocals()
  }

  @action startListen = (delay: number = 1000) => {
    const listenTask = async () => {
      try {
        const file: Aria2File = await aria2Store.aria2.tellStatus(this.gid)
        runInAction(`listen task ${this.gid} successful`, () => {
          this.aria2File = file
          this.isNotFound = false
        })
      } catch (e) {
        const err: IAria2Error = e
        runInAction(`listen task ${this.gid} failed`, () => {
          if (err.message.match('not found')) {
            this.isNotFound = true
            this.stopListen()
          }
        })
      }
    }
    listenTask()
    this.interval = setInterval(listenTask, delay)
  }

  @action stopListen = (immediatly = false) => {
    if (immediatly) {
      clearInterval(this.interval)
    } else {
      setTimeout(() => {
        clearInterval(this.interval)
      }, 1000)
    }
  }

  @computed get filename(): string {
    if (!this.isNotFound) {
      return parseFileName(this.aria2File.files[0].path)
    } else {
      return this.dbTaskFile.filename
    }
  }

  @computed get fileSize(): string {
    if (this.isNotFound) {
      return parseSize(0)
    } else {
      return parseSize(this.aria2File.totalLength)
    }
  }

  @computed get downloadSpeed() {
    if (this.isNotFound) {
      return parseSize(0)
    } else {
      return parseSize(this.aria2File.downloadSpeed)
    }
  }

  @computed get progress(): number {
    if (this.isNotFound) {
      return computedProgress(0, 0)
    } else {
      return computedProgress(Number(this.aria2File.completedLength), Number(this.aria2File.totalLength))
    }
  }

  @computed get taskStatus(): Aria2TaskStatus {
    if (this.isNotFound) {
      return 'paused'
    } else {
      return this.aria2File.status
    }
  }

  @computed get fileDir(): string {
    if (this.isNotFound) {
      return this.dbTaskFile.dir
    } else {
      return this.aria2File.dir
    }
  }
}
