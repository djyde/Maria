import * as React from 'react'
import { render } from 'react-dom'
import { observer } from 'mobx-react'
import { useStrict } from 'mobx'
import {
  Menu,
  MenuItem,
  MenuDivider
} from '@blueprintjs/core'
import FileList from './components/FileList'
import { aria2Store, Aria2Status } from './stores/aria2.store'
import { globalStore } from './stores/global.store'
import CreateTaskModal from './components/CreateTaskModal'
import DevTools from 'mobx-react-devtools'
import { Router, Link, Route, hashHistory } from 'react-router'
import TasksView from './views/TasksView'
import SettingsView from './views/SettingsView'

useStrict(true)

const Entry = () => {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <Route path='/tasks' component={TasksView} />
        <Route path='/settings' component={SettingsView} />
      </Route>
    </Router>
  )
}

@observer
class App extends React.Component<{}, {}> {

  componentWillMount () {

  }

  render() {
    return (
      <div className='pt-app'>
        <DevTools />
        <CreateTaskModal />
        <nav id='navbar' className='pt-navbar draggable pt-dark'>
          <div className='pt-navbar-group pt-align-left'>
            <div className='pt-navbar-heading'></div>
          </div>
          <div className='pt-navbar-group pt-align-right'>
            <button className='pt-button pt-minimal pt-icon-add' onClick={globalStore.openCreateTaskModal}></button>
          </div>
        </nav>
        <section id='container'>
          <div id='sidebar'>
            <SideMenu />
          </div>
          <div id='content' className='pt-light'>
            {this.props.children}
          </div>
        </section>
      </div>
    )
  }
}

const SideMenu = () => {
  return (
    <Menu className='pt-dark'>
      <MenuDivider title='Task' />
      <Link to='tasks' className='pt-menu-item pt-icon-inbox'>All</Link>
      <MenuItem iconName='download' text='Downloading'></MenuItem>
      <MenuItem iconName='tick' text='Finished'></MenuItem>
      <MenuDivider />
      <Link to='settings' className='pt-menu-item pt-icon-settings'>Settings</Link>
    </Menu>
  )
}

render(<Entry />, document.querySelector('#app'))
