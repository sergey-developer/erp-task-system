import { FC } from 'react'

import TaskListLayout from 'modules/task/features/TaskListLayout'
import TaskListMap from 'modules/task/features/TaskListMap'
import { useGetTaskListMapQuery } from 'modules/task/services/taskApi.service'

import LoadingArea from 'components/LoadingArea'

const TaskListMapPage: FC = () => {
  const { currentData: taskListMap = [], isFetching: taskListMapIsFetching } =
    useGetTaskListMapQuery()

  return (
    <TaskListLayout>
      <div data-testid='task-list-map-page'>
        <LoadingArea isLoading={taskListMapIsFetching}>
          <TaskListMap tasks={taskListMap} />
        </LoadingArea>
      </div>
    </TaskListLayout>
  )
}

export default TaskListMapPage
