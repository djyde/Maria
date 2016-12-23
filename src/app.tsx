import * as React from 'react'
import { render } from 'react-dom'
import config from './config'
import {
  Menu,
  MenuItem,
  MenuDivider
} from '@blueprintjs/core'
import FileList, { IFile, DOWNLOAD_STATUS } from './components/FileList'

const files: IFile[] = [
  { filename: 'Foo.jpg', path: '/path/to', size: 102, status: DOWNLOAD_STATUS.FINISHED, source: 'https://github.com/egoist/observer/archive/master.zip', progress: 0 },
  { filename: 'Bar.jpg', path: '/path/to/bar', size: 12212, status: DOWNLOAD_STATUS.PAUSE, source: 'https://github.com/egoist/observer/archive/master.zip', progress: 0 }
]

const App = () => {
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
          <FileList files={files} />
        </div>
      </section>
    </div>
  )
}

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