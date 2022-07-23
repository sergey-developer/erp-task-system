import React, { FC, useEffect } from 'react'

import { TaskListItemModel } from 'modules/tasks/taskList/models'
import useGetTask from 'modules/tasks/taskView/hooks/useGetTask'
import useGetWorkGroupList from 'modules/workGroups/workGroupList/hooks/useGetWorkGroupList'

import TaskDetails from '../TaskDetails'

type TaskDetailsContainerProps = {
  taskId: TaskListItemModel['id']
  onClose: () => void
  onTaskResolved: () => void
  refetchTaskList: () => void
}

const TaskDetailsContainer: FC<TaskDetailsContainerProps> = ({
  onClose,
  onTaskResolved,
  taskId,
  refetchTaskList,
}) => {
  const {
    data: task,
    isFetching: taskIsFetching,
    isError: isGetTaskError,
    refetch: refetchTask,
  } = useGetTask(taskId)

  const { data: workGroupList = [], isFetching: workGroupListIsFetching } =
    useGetWorkGroupList()

  useEffect(() => {
    if (isGetTaskError) {
      onClose()
    }
  }, [isGetTaskError, onClose])

  return (
    <TaskDetails
      details={task || null}
      onClose={onClose}
      onTaskResolved={onTaskResolved}
      taskLoading={taskIsFetching}
      workGroupListIsLoading={workGroupListIsFetching}
      workGroupList={workGroupList}
      refetchTask={refetchTask}
      refetchTaskList={refetchTaskList}
    />
  )
}

export default TaskDetailsContainer
