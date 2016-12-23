import { observable, action } from 'mobx'

export class GlobalStore {
  @observable createTaskModalVisible = false

  @action openCreateTaskModal = () => {
    this.createTaskModalVisible = true
  }

  @action closeCreateTaskModal = () => {
    this.createTaskModalVisible = false
  }

  constructor () {
  }
}

export const globalStore = new GlobalStore()
