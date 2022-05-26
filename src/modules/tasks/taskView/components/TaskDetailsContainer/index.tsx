import React, { FC, useEffect } from 'react'

import { TaskListItemModel } from 'modules/tasks/taskList/models'
import useGetTaskById from 'modules/tasks/taskView/hooks/useGetTaskById'
import useGetWorkGroupList from 'modules/workGroups/workGroupList/hooks/useGetWorkGroupList'

import TaskDetails from '../TaskDetails'

type TaskDetailsContainerProps = {
  taskId: TaskListItemModel['id']
  onClose: () => void
}

const TaskDetailsContainer: FC<TaskDetailsContainerProps> = ({
  taskId,
  onClose,
}) => {
  const {
    data: task,
    isLoading: taskLoading,
    isFetching: taskFetching,
    isError: isTaskError,
  } = useGetTaskById(taskId)

  const {
    data: workGroupList,
    isLoading: workGroupListLoading,
    isFetching: workGroupListFetching,
  } = useGetWorkGroupList()

  useEffect(() => {
    if (isTaskError) {
      onClose()
    }
  }, [isTaskError, onClose])

  return (
    <TaskDetails
      onClose={onClose}
      taskLoading={taskLoading || taskFetching}
      workGroupListLoading={workGroupListLoading || workGroupListFetching}
      workGroupList={workGroupList?.results || []}
      details={task}
    />
  )
}

export default TaskDetailsContainer
