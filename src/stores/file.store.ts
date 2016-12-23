import { observable, action, computed } from 'mobx'

export function computedProgress (completed, total) {
  return parseFloat((completed / total).toFixed(3)) * 100

}

export enum DOWNLOAD_STATUS {
  WAITING, PAUSED, ACTIVE, ERROR, COMPLETE, REMOVED
}

export interface IFile {
  gid: string,
  filename: string,
  path: string,
  totalLength: number,
  downloadSpeed: number,
  completedLength: number,
  source: string,
  status: DOWNLOAD_STATUS
}

export class FileStore {
  @observable file: IFile

  constructor (file: IFile) {
    this.file = file

    // setInterval(this.setProgress.bind(this), 1000)
  }

  @action startListen = () => {

  }

  @action setProgress = () => {
    this.file.completedLength += 1
  }

  @computed get fileSize (): string {
    return ''
  }

  @computed get progress (): number {
    return computedProgress(this.file.completedLength, this.file.totalLength)
  }
}
