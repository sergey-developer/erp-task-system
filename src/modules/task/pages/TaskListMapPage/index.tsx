import { FC } from 'react'

import TaskListLayout from 'modules/task/features/TaskListLayout'

const TaskListMapPage: FC = () => {
  return (
    <TaskListLayout>
      <div data-testid='task-list-map-page'>TaskListMapPage</div>
    </TaskListLayout>
  )
}

export default TaskListMapPage
