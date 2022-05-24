import React, { FC, useEffect } from 'react'

import { Task } from 'modules/tasks/taskList/models'
import useGetOneTaskById from 'modules/tasks/taskView/hooks/useGetOneTaskById'
import useGetWorkGroupList from 'modules/workGroups/workGroupList/hooks/useGetWorkGroupList'

import TaskDetails from '../TaskDetails'

type TaskDetailsContainerProps = {
  taskId: Task['id']
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
  } = useGetOneTaskById(taskId)

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
      details={task || null}
    />
  )
}

export default TaskDetailsContainer
