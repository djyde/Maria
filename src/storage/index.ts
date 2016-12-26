import * as low from 'lowdb'
import * as fileSync from 'lowdb/lib/file-sync'
const { remote } = global.require('electron')
const path = global.require('path')

export interface ITaskFile {
  dir: string,
  gid: string,
  filename: string,
  createdAt: string,
  updatedAt: string,
  status?: Aria2TaskStatus,
  path?: string
}

export interface IDatabaseStructure {
  tasks: ITaskFile[]
}

const userDataDir = remote.app.getPath('userData')
const dbPath = path.join(userDataDir, 'maria.db.json')

const db = new low(dbPath, { storage: fileSync })
db.defaults({
  tasks: []
}).value()

export function getAllTasks () {
  return db.get('tasks').value() as ITaskFile[]
}

export const getDBTaskByGID = (gid: string): ITaskFile => {
  return db.get('tasks').find({ gid }).value() as ITaskFile
}

export const createTask = (gid: string, filename: string, dir: string) => {
  const createdAt = Date.now().toString()
  const updatedAt = createdAt
  db.get('tasks').push({
    gid,
    dir,
    filename,
    createdAt,
    updatedAt
  })
  .value()
}

export const removeTask = (gid: string) => {
  db.get('tasks').remove({ gid }).value()
}

export default db
