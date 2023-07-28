import { Col, Row } from 'antd'
import { FC, useState } from 'react'

import TaskListLayout from 'modules/task/features/TaskListLayout'
import TaskListMap from 'modules/task/features/TaskListMap'
import { useGetTaskListMapQuery } from 'modules/task/services/taskApi.service'

import LoadingArea from 'components/LoadingArea'

import { MaybeNull } from 'shared/interfaces/utils'

const TaskListMapPage: FC = () => {
  const { currentData: taskListMap = [], isFetching: taskListMapIsFetching } =
    useGetTaskListMapQuery()

  const [coords, setCoords] = useState<MaybeNull<[number, number]>>(null)

  return (
    <TaskListLayout>
      <Row data-testid='task-list-map-page'>
        {coords && (
          <Col span={6}>
            long: {coords[0]}, lat: {coords[1]}{' '}
          </Col>
        )}

        <Col span={coords ? 18 : 24}>
          <LoadingArea isLoading={taskListMapIsFetching}>
            <TaskListMap tasks={taskListMap} onClick={setCoords} />
          </LoadingArea>
        </Col>
      </Row>
    </TaskListLayout>
  )
}

export default TaskListMapPage
