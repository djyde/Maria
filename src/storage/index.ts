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
  tasks: ITaskFile[],
  global: IGlobalOption
}

export interface IGlobalOption {
  dir: string,
  notification: boolean
}

const userDataDir = remote.app.getPath('userData')
const dbPath = path.join(userDataDir, 'maria.db.json')

const db = new low(dbPath, { storage: fileSync })

const defaultOption: IDatabaseStructure = {
  global: {
    dir: '',
    notification: true
  },
  tasks: []
}

db.defaults(defaultOption).value()

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

export function setDefaultDir (dir: string) {
  const configDir = db.get('global.dir')

  if (configDir.value() === '') {
    db.set('global.dir', dir).value()
  }
}

export function setDir (dir: string) {
  db.set('global.dir', dir).value()
}

export function getGlobalOption () {
  return db.get('global').value() as IGlobalOption
}

export function switchNotification (isOpen: boolean) {
  db.set('global.notification', isOpen).value()
}

export function toggleNotification () {
  db.set('global.notification', !db.get('global.notification').value()).value()
}

export default db
