import { observable } from 'mobx'
import Aria2 from 'aria2'

export class GlobalStore {
  @observable version: string

  constructor (private aria2: Aria2) {
  }
}

export const aria2 = new Aria2({
  host: 'localhost',
  port: 6800,
  path: '/jsonrpc'
})

export const globalStore = new GlobalStore(aria2)
