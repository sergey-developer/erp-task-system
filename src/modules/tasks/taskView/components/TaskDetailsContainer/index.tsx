import React, { FC, useEffect } from 'react'

import { TaskListItemModel } from 'modules/tasks/taskList/models'
import useGetTaskById from 'modules/tasks/taskView/hooks/useGetTaskById'
import useGetWorkGroupList from 'modules/workGroups/workGroupList/hooks/useGetWorkGroupList'

import TaskDetails from '../TaskDetails'

type TaskDetailsContainerProps = {
  taskId: TaskListItemModel['id']
  onClose: () => void
  onTaskResolved: () => void
}

const TaskDetailsContainer: FC<TaskDetailsContainerProps> = (props) => {
  const { onClose, onTaskResolved, taskId } = props

  const {
    data: task,
    isFetching: taskIsFetching,
    isError: isTaskError,
  } = useGetTaskById(taskId)

  const { data: workGroupList, isFetching: workGroupListIsFetching } =
    useGetWorkGroupList()

  useEffect(() => {
    if (isTaskError) {
      onClose()
    }
  }, [isTaskError, onClose])

  return (
    <TaskDetails
      details={task || null}
      onClose={onClose}
      onTaskResolved={onTaskResolved}
      taskLoading={taskIsFetching}
      workGroupListLoading={workGroupListIsFetching}
      workGroupList={workGroupList || []}
    />
  )
}

export default TaskDetailsContainer
