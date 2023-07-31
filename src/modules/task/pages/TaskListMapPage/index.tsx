import { Col, Row } from 'antd'
import { FC, useState } from 'react'

import TaskList from 'modules/task/features/TaskList'
import TaskListLayout from 'modules/task/features/TaskListLayout'
import TaskListMap from 'modules/task/features/TaskListMap'
import { useGetTaskListMapQuery } from 'modules/task/services/taskApi.service'

import LoadingArea from 'components/LoadingArea'

import { MaybeNull } from 'shared/interfaces/utils'

const TaskListMapPage: FC = () => {
  const [coords, setCoords] = useState<MaybeNull<[number, number]>>(null)

  const { currentData: taskListMap = [], isFetching: taskListMapIsFetching } =
    useGetTaskListMapQuery()

  return (
    <TaskListLayout>
      <Row gutter={8} data-testid='task-list-map-page'>
        {coords && (
          <Col span={6}>
            <TaskList />
          </Col>
        )}

        <Col span={coords ? 18 : 24}>
          <LoadingArea isLoading={taskListMapIsFetching}>
            <TaskListMap tasks={taskListMap} onClickTask={setCoords} />
          </LoadingArea>
        </Col>
      </Row>
    </TaskListLayout>
  )
}

export default TaskListMapPage
