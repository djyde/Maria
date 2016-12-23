import * as React from 'react'
import {
  Dialog
} from '@blueprintjs/core'
import { observer } from 'mobx-react'
import { globalStore } from '../stores/global.store'
import CreateTaskForm from './CreateTaskForm'

const CreateTaskModal = observer(() => {
  return (
    <Dialog
      isOpen={globalStore.createTaskModalVisible}
      canOutsideClickClose={true}
      onClose={globalStore.closeCreateTaskModal}
      title='Create task'
    >
      <CreateTaskForm />
    </Dialog>
  )
})

export default CreateTaskModal
