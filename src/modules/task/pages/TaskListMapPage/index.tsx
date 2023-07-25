import { FC } from 'react'

import TaskListLayout from 'modules/task/features/TaskListLayout'

import Map from 'components/Map'

const TaskListMapPage: FC = () => {
  return (
    <TaskListLayout>
      <div data-testid='task-list-map-page'>
        <Map />
      </div>
    </TaskListLayout>
  )
}

export default TaskListMapPage
