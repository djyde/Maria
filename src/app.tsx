import * as React from 'react'
import { render } from 'react-dom'
import { observer } from 'mobx-react'
import config from './config'
import {
  Menu,
  MenuItem,
  MenuDivider
} from '@blueprintjs/core'
import FileList from './components/FileList'
import { DOWNLOAD_STATUS } from './stores/file.store'
import { aria2Store, Aria2Status } from './stores/aria2.store'

const App = observer(() => {
  return (
    <div className='pt-app pt-dark'>
      <nav id='navbar' className='pt-navbar draggable'>
        <div className='pt-navbar-group pt-align-left'>
          <div className='pt-navbar-heading'></div>
        </div>
        <div className='pt-navbar-group pt-align-right'>
          <button className='pt-button pt-minimal pt-icon-cog'></button>
        </div>
      </nav>
      <section id='container'>
        <div id='sidebar'>
          <SideMenu />
        </div>
        <div id='content'>
          { aria2Store.status === Aria2Status.OPENED ? <FileList /> : <div>Disconnect</div>}
        </div>
      </section>
    </div>
  )
})

const SideMenu = () => {
  return (
    <Menu>
      <MenuDivider title='Task'/>
      <MenuItem iconName='inbox' text='All'></MenuItem>
      <MenuItem iconName='download' text='Downloading'></MenuItem>
      <MenuItem iconName='tick' text='Finished'></MenuItem>
      <MenuDivider />
      <MenuItem iconName='settings' text='Setting'></MenuItem>
    </Menu>
  )
}

render(<App />, document.querySelector('#app'))
