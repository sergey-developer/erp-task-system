import { useBoolean } from 'ahooks'
import { Col, Row } from 'antd'
import { Coordinate } from 'ol/coordinate'
import { FC, useEffect, useState } from 'react'

import TaskCard from 'modules/task/components/TaskCard/CardContainer'
import TaskList from 'modules/task/components/TaskList'
import TaskListLayout from 'modules/task/components/TaskListLayout'
import TaskListMap from 'modules/task/components/TaskListMap'
import { getTaskListMapMessages } from 'modules/task/constants'
import { useLazyGetTaskList } from 'modules/task/hooks'
import { useGetTaskListMapQuery } from 'modules/task/services/taskApi.service'

import LoadingArea from 'components/LoadingArea'

import { MaybeNull } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

const TaskListMapPage: FC = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<MaybeNull<number>>(null)

  const [coords, setCoords] = useState<MaybeNull<Coordinate>>(null)

  const [additionalInfoExpanded, { toggle: toggleAdditionalInfoExpanded }] =
    useBoolean(false)

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
      getTaskList({ long: coords[0], lat: coords[1], limit: 1000 })
    }
  }, [coords, getTaskList])

  const isShowTaskCard = !!selectedTaskId
  const isShowTaskList = !!coords

  return (
    <TaskListLayout>
      <Row gutter={8} data-testid='task-list-map-page'>
        {coords && (
          <Col span={6}>
            <LoadingArea
              data-testid='task-list-loading'
              isLoading={taskListIsFetching}
            >
              <TaskList
                tasks={taskList?.results || []}
                selectedTaskId={selectedTaskId}
                onClickTask={setSelectedTaskId}
              />
            </LoadingArea>
          </Col>
        )}

        <Col
          span={
            isShowTaskList && !isShowTaskCard
              ? 18
              : isShowTaskList && isShowTaskCard
              ? 10
              : 24
          }
        >
          <LoadingArea
            data-testid='task-list-map-loading'
            isLoading={taskListMapIsFetching}
          >
            <TaskListMap tasks={taskListMap} onClickTask={setCoords} />
          </LoadingArea>
        </Col>

        {isShowTaskCard && (
          <Col span={8}>
            <TaskCard
              taskId={selectedTaskId}
              closeTaskCard={() => setSelectedTaskId(null)}
              additionalInfoExpanded={additionalInfoExpanded}
              onExpandAdditionalInfo={toggleAdditionalInfoExpanded}
            />
          </Col>
        )}
      </Row>
    </TaskListLayout>
  )
}

export default TaskListMapPage
