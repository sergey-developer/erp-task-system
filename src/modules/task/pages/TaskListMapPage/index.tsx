import { useBoolean } from 'ahooks'
import { Col, Row } from 'antd'
import { Coordinate } from 'ol/coordinate'
import { FC, useState } from 'react'

import TaskCard from 'modules/task/components/TaskCard/CardContainer'
import TaskList from 'modules/task/components/TaskList'
import TaskListMap from 'modules/task/components/TaskListMap'
import { useGetTaskList, useGetTaskListMap } from 'modules/task/hooks/task'

import LoadingArea from 'components/LoadingArea'

import { MaybeNull } from 'shared/types/utils'

const TaskListMapPage: FC = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<MaybeNull<number>>(null)

  const [coords, setCoords] = useState<MaybeNull<Coordinate>>(null)

  const isShowTaskCard = !!selectedTaskId
  const isShowTaskList = !!coords

  const [additionalInfoExpanded, { toggle: toggleAdditionalInfoExpanded }] = useBoolean(false)

  const { currentData: taskListMap = [], isFetching: taskListMapIsFetching } = useGetTaskListMap()

  const { currentData: taskList, isFetching: taskListIsFetching } = useGetTaskList(
    { long: coords?.[0], lat: coords?.[1], limit: 1000 },
    { skip: !isShowTaskList },
  )

  return (
    <Row gutter={8} data-testid='task-list-map-page'>
      {isShowTaskList && (
        <Col span={6}>
          <LoadingArea data-testid='task-list-loading' isLoading={taskListIsFetching}>
            <TaskList
              tasks={taskList?.results || []}
              selectedTaskId={selectedTaskId}
              onClickTask={setSelectedTaskId}
            />
          </LoadingArea>
        </Col>
      )}

      <Col
        span={isShowTaskList && !isShowTaskCard ? 18 : isShowTaskList && isShowTaskCard ? 10 : 24}
      >
        <LoadingArea data-testid='task-list-map-loading' isLoading={taskListMapIsFetching}>
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
  )
}

export default TaskListMapPage
