import { Col, Row } from 'antd'
import { Coordinate } from 'ol/coordinate'
import { FC, useEffect, useState } from 'react'

import { getTaskListMapMessages } from 'modules/task/constants'
import TaskList from 'modules/task/features/TaskList'
import TaskListLayout from 'modules/task/features/TaskListLayout'
import TaskListMap from 'modules/task/features/TaskListMap'
import { useLazyGetTaskList } from 'modules/task/hooks'
import { useGetTaskListMapQuery } from 'modules/task/services/taskApi.service'

import LoadingArea from 'components/LoadingArea'

import { MaybeNull } from 'shared/interfaces/utils'
import { showErrorNotification } from 'shared/utils/notifications'

const TaskListMapPage: FC = () => {
  const [coords, setCoords] = useState<MaybeNull<Coordinate>>(null)

  const {
    currentData: taskListMap = [],
    isFetching: taskListMapIsFetching,
    isError: isGetTaskListMapError,
  } = useGetTaskListMapQuery()

  useEffect(() => {
    if (isGetTaskListMapError) {
      showErrorNotification(getTaskListMapMessages.commonError)
    }
  }, [isGetTaskListMapError])

  const [getTaskList, { data: taskList, isFetching: taskListIsFetching }] =
    useLazyGetTaskList()

  useEffect(() => {
    if (coords) {
      getTaskList({ long: coords[0], lat: coords[1] })
    }
  }, [coords, getTaskList])

  return (
    <TaskListLayout>
      <Row gutter={8} data-testid='task-list-map-page'>
        {coords && (
          <Col span={6}>
            <LoadingArea
              data-testid='task-list-loading'
              isLoading={taskListIsFetching}
            >
              <TaskList tasks={taskList?.results || []} />
            </LoadingArea>
          </Col>
        )}

        <Col span={coords ? 18 : 24}>
          <LoadingArea
            data-testid='task-list-map-loading'
            isLoading={taskListMapIsFetching}
          >
            <TaskListMap tasks={taskListMap} onClickTask={setCoords} />
          </LoadingArea>
        </Col>
      </Row>
    </TaskListLayout>
  )
}

export default TaskListMapPage
