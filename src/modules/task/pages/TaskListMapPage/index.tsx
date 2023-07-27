import { FC } from 'react'

import TaskListLayout from 'modules/task/features/TaskListLayout'
import TaskListMap from 'modules/task/features/TaskListMap'

const coords = [
  [-0.047758, 51.517351],
  [-0.107758, 51.517351],
  [-0.117758, 51.517351],
  [-0.127758, 51.507351],
  [-0.131647, 51.40534],
  [-0.116647, 51.40534],
  [-0.126647, 51.30534],
]

const TaskListMapPage: FC = () => {
  return (
    <TaskListLayout>
      <div data-testid='task-list-map-page'>
        <TaskListMap coords={coords} />
      </div>
    </TaskListLayout>
  )
}

export default TaskListMapPage
