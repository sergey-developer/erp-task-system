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
}

const TaskDetailsContainer: FC<TaskDetailsContainerProps> = ({
  onClose,
  taskId,
}) => {
  const {
    data: task = null,
    isFetching: taskIsFetching,
    isError: isGetTaskError,
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
      reclassificationRequest={reclassificationRequest}
      createReclassificationRequest={createReclassificationRequest}
      reclassificationRequestIsCreating={reclassificationRequestIsCreating}
      onClose={onClose}
      workGroupList={workGroupList}
      workGroupListIsLoading={workGroupListIsFetching}
      getWorkGroupListError={getWorkGroupListError as ErrorResponse}
    />
  )
}

export default TaskDetailsContainer
