import React, { FC, useEffect } from 'react'

import { TaskListItemModel } from 'modules/task/components/TaskList/models'
import useCreateTaskReclassificationRequest from 'modules/task/components/TaskView/hooks/useCreateTaskReclassificationRequest'
import useGetTask from 'modules/task/components/TaskView/hooks/useGetTask'
import useGetTaskReclassificationRequest from 'modules/task/components/TaskView/hooks/useGetTaskReclassificationRequest'
import useGetWorkGroupList from 'modules/workGroup/components/WorkGroupList/hooks/useGetWorkGroupList'
import { ErrorResponse } from 'shared/services/api'

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
    data: task = null,
    isFetching: taskIsFetching,
    isError: isGetTaskError,
    refetch: refetchTask,
  } = useGetTask(taskId)

  const { currentData: reclassificationRequest = null } =
    useGetTaskReclassificationRequest(taskId)

  const {
    fn: createReclassificationRequest,
    state: { isLoading: reclassificationRequestIsCreating },
  } = useCreateTaskReclassificationRequest()

  const {
    data: workGroupList = [],
    isFetching: workGroupListIsFetching,
    error: getWorkGroupListError,
  } = useGetWorkGroupList()

  useEffect(() => {
    if (isGetTaskError) {
      onClose()
    }
  }, [isGetTaskError, onClose])

  return (
    <TaskDetails
      details={task}
      taskIsLoading={taskIsFetching}
      refetchTask={refetchTask}
      refetchTaskList={refetchTaskList}
      reclassificationRequest={reclassificationRequest}
      createReclassificationRequest={createReclassificationRequest}
      reclassificationRequestIsCreating={reclassificationRequestIsCreating}
      onClose={onClose}
      onTaskResolved={onTaskResolved}
      workGroupList={workGroupList}
      workGroupListIsLoading={workGroupListIsFetching}
      getWorkGroupListError={getWorkGroupListError as ErrorResponse}
    />
  )
}

export default TaskDetailsContainer
