import { useBoolean } from 'ahooks'
import { Col, Row } from 'antd'
import TasksFromMap from 'features/tasks/components/TasksFromMap'
import TasksOnMap from 'features/tasks/components/TasksOnMap'
import { useGetTasks, useGetTasksMap } from 'features/tasks/hooks'
import { Coordinate } from 'ol/coordinate'
import React, { FC, useState } from 'react'

import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'
import { extractPaginationResults } from 'shared/utils/pagination'

const TaskDetails = React.lazy(() => import('features/tasks/components/TaskDetails'))

const TasksOnMapPage: FC = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<MaybeNull<IdType>>(null)

  const [coords, setCoords] = useState<MaybeNull<Coordinate>>(null)

  const isShowTask = !!selectedTaskId
  const isShowTaskList = !!coords

  const [additionalInfoExpanded, { toggle: toggleAdditionalInfoExpanded }] = useBoolean(false)

  const { currentData: taskListMap = [], isFetching: taskListMapIsFetching } = useGetTasksMap()

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
            <TasksFromMap
              tasks={extractPaginationResults(taskList)}
              selectedTaskId={selectedTaskId}
              onClickTask={setSelectedTaskId}
            />
          </LoadingArea>
        </Col>
      )}

      <Col span={isShowTaskList ? 18 : 24}>
        <LoadingArea data-testid='task-list-map-loading' isLoading={taskListMapIsFetching}>
          <TasksOnMap tasks={taskListMap} onClickTask={setCoords} />
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

export default TasksOnMapPage
