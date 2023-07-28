import { FC, useState } from 'react'

import TaskListLayout from 'modules/task/features/TaskListLayout'
import TaskListMap from 'modules/task/features/TaskListMap'
import { useGetTaskListMapQuery } from 'modules/task/services/taskApi.service'

import LoadingArea from 'components/LoadingArea'

const TaskListMapPage: FC = () => {
  const { currentData: taskListMap = [], isFetching: taskListMapIsFetching } =
    useGetTaskListMapQuery()

  const [coords, setCoords] = useState<[number, number]>()

  return (
    <TaskListLayout>
      <div data-testid='task-list-map-page'>
        {coords?.length && <div>task list</div>}

        <LoadingArea isLoading={taskListMapIsFetching}>
          <TaskListMap tasks={taskListMap} onClick={setCoords} />
        </LoadingArea>
      </div>
    </TaskListLayout>
  )
}

export default TaskListMapPage
