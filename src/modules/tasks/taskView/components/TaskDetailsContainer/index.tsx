import _pick from 'lodash/pick'
import React, { FC, useEffect } from 'react'

import { Task } from 'modules/tasks/taskList/models'
import useGetTaskById from 'modules/tasks/taskView/hooks/useGetTaskById'
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

  const taskDetails = task
    ? _pick(
        task,
        'id',
        'recordId',
        'title',
        'createdAt',
        'name',
        'address',
        'contactService',
        'olaNextBreachTime',
        'workGroup',
        'assignee',
        'status',
      )
    : null

  return (
    <TaskDetails
      onClose={onClose}
      taskLoading={taskLoading || taskFetching}
      workGroupListLoading={workGroupListLoading || workGroupListFetching}
      workGroupList={workGroupList?.results || []}
      details={taskDetails}
    />
  )
}

export default TaskDetailsContainer
