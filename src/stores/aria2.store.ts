import { observable, action, runInAction, computed, toJS } from 'mobx'
import * as Aria2 from 'aria2'
import {
  Toaster
} from '@blueprintjs/core'

export interface IAria2Option {
  host: string,
  port: number,
  secure?: boolean,
  secret?: string,
  path: '/jsonrpc'
}

export interface IAria2GlobalOption {
  dir: string
}

export enum Aria2Status {
  WAITING, OPENED, CLOSED, ERROR
}

export class Aria2Store {
  aria2: Aria2
  @observable status: Aria2Status = Aria2Status.WAITING
  @observable waitings: Aria2File[] = []
  @observable actives: Aria2File[] = []
  @observable stoppeds: Aria2File[] = []
  @observable globalOption: IAria2GlobalOption

  @observable locals: Aria2File[] = []

  constructor (option: IAria2Option) {
    this.aria2 = new Aria2(option)

    this.aria2.open()

    this.aria2.onopen = () => {
      this.status = Aria2Status.OPENED
      Toaster.create().show({ message: 'Aria2 connect success' })
      this.getLocals()
      this.getGlobalOption()
    }

    this.aria2.onclose = () => {
      this.status = Aria2Status.CLOSED
      Toaster.create().show({ message: 'Aria2 connect error' })
    }
  }

  @action getGlobalOption = async () => {
    const options: IAria2GlobalOption = await this.aria2.getGlobalOption()
    runInAction('get global option success', () => {
      this.globalOption = options
    })
  }

  @action getLocals = async () => {
    const actives: Aria2File[] = await this.aria2.tellActive()
    const waitings: Aria2File[] = await this.aria2.tellWaiting(0, 10)
    runInAction('set local', () => {
      this.locals = ([] as Aria2File[]).concat(actives, waitings)
    })
  }

  @action getActive = async () => {
    if (this.status === Aria2Status.OPENED) {
      const actives: Aria2File[] = await this.aria2.tellActive()
      runInAction('set actives', () => {
        this.actives = actives
      })
    }
  }

  @action getWaiting = async (offset = 0, num = 10) => {
    if (this.status === Aria2Status.OPENED) {
      const waitings: Aria2File[] = await this.aria2.tellWaiting(offset, num)
      runInAction('set waitings', () => {
        this.waitings = waitings
      })
    }
  }

  @action getStopped = async (offset = 0, num = 10) => {
    if (this.status === Aria2Status.OPENED) {
      const stoppeds: Aria2File[] = await this.aria2.tellStopped(offset, num)
      runInAction('set stopped', () => {
        this.stoppeds = stoppeds
      })
    }
  }
}

export const aria2Store = new Aria2Store({
  host: 'localhost',
  port: 6800,
  path: '/jsonrpc'
})
