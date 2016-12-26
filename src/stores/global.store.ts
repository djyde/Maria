import { observable, action } from 'mobx'
import { getAllTasks, ITaskFile } from '../storage'

export class GlobalStore {
  @observable createTaskModalVisible = false
  @observable allTasks: ITaskFile[] = []

  @action openCreateTaskModal = () => {
    this.createTaskModalVisible = true
  }

  @action closeCreateTaskModal = () => {
    this.createTaskModalVisible = false
  }

  @action getAllTasks = () => {
    this.allTasks = getAllTasks()
  }

  constructor () {
    this.getAllTasks()
  }
}

export const globalStore = new GlobalStore()
