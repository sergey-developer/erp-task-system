import { useBoolean } from 'ahooks'
import { Col, Row } from 'antd'
import { Coordinate } from 'ol/coordinate'
import React, { FC, useState } from 'react'

import TaskList from 'modules/task/components/TaskList'
import TaskListMap from 'modules/task/components/TaskListMap'
import { useGetTaskListMap, useGetTasks } from 'modules/task/hooks/task'

import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { MaybeNull } from 'shared/types/utils'
import { extractPaginationResults } from 'shared/utils/pagination'

const TaskDetails = React.lazy(() => import('modules/task/components/TaskDetails'))

const TaskListMapPage: FC = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<MaybeNull<number>>(null)

  const [coords, setCoords] = useState<MaybeNull<Coordinate>>(null)

  const isShowTask = !!selectedTaskId
  const isShowTaskList = !!coords

  const [additionalInfoExpanded, { toggle: toggleAdditionalInfoExpanded }] = useBoolean(false)

  const { currentData: taskListMap = [], isFetching: taskListMapIsFetching } = useGetTaskListMap()

  const { currentData: taskList, isFetching: taskListIsFetching } = useGetTasks(
    { long: coords?.[0], lat: coords?.[1], limit: 1000 },
    { skip: !isShowTaskList },
  )

  const closeTask = useDebounceFn(() => setSelectedTaskId(null))

  return (
    <Row gutter={8} data-testid='task-list-map-page'>
      {isShowTaskList && (
        <Col span={6}>
          <LoadingArea data-testid='task-list-loading' isLoading={taskListIsFetching}>
            <TaskList
              tasks={extractPaginationResults(taskList)}
              selectedTaskId={selectedTaskId}
              onClickTask={setSelectedTaskId}
            />
          </LoadingArea>
        </Col>
      )}

      <Col span={isShowTaskList ? 18 : 24}>
        <LoadingArea data-testid='task-list-map-loading' isLoading={taskListMapIsFetching}>
          <TaskListMap tasks={taskListMap} onClickTask={setCoords} />
        </LoadingArea>
      </Col>

      {isShowTask && (
        <React.Suspense fallback={<ModalFallback open onCancel={closeTask} />}>
          <TaskDetails
            taskId={selectedTaskId}
            onClose={closeTask}
            additionalInfoExpanded={additionalInfoExpanded}
            onExpandAdditionalInfo={toggleAdditionalInfoExpanded}
          />
        </React.Suspense>
      )}
    </Row>
  )
}

export default TaskListMapPage
