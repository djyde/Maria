import * as React from 'react'
import { aria2Store } from '../stores/aria2.store'
import { getGlobalOption, setDir, toggleNotification } from '../storage'
import {
  Checkbox,
  Button,
  InputGroup,
  Toaster,
  Intent
} from '@blueprintjs/core'
import Row from '../components/Row'
import { observer } from 'mobx-react'
import { observable, action, computed, runInAction } from 'mobx'
import { remote } from 'electron'
const { dialog } = remote

export class SettingsViewStore {

  private pathInputRef: HTMLInputElement

  notifySaveChange = () => {
    // const toaster = Toaster.create()
    // toaster.show({ message: 'Change save!', intent: Intent.SUCCESS})
  }

  savePathInputRef = (ref: HTMLInputElement) => {
    this.pathInputRef = ref
  }

  choosePath = () => {
    dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory'], defaultPath: this.pathInputRef.value }, (paths: string | undefined) => {
      if (paths) {
        this.pathInputRef.value = paths[0]
        setDir(this.pathInputRef.value)
        this.notifySaveChange()
      }
    })
  }

  toggleNotification = () => {
    toggleNotification()
    this.notifySaveChange()
  }
}

export const settingsViewStore = new SettingsViewStore()

@observer
class SettingsView extends React.Component<{}, {}> {
  render() {
    return (
      <div id='settings-view'>
        <h6 className='title'>Settings</h6>
        <div style={{ marginLeft: '2em' }}>
          <label className='pt-label pt-inline'>
            下载目录
            <InputGroup
              disabled={true}
              defaultValue={getGlobalOption().dir}
              inputRef={settingsViewStore.savePathInputRef}
              rightElement={<Button iconName='folder-open' className='pt-minimal' onClick={settingsViewStore.choosePath} />}
            />
          </label>
          <Checkbox label='任务完成后通知' defaultChecked={getGlobalOption().notification} onChange={settingsViewStore.toggleNotification}/>
        </div>
      </div>
    )
  }
}

export default SettingsView