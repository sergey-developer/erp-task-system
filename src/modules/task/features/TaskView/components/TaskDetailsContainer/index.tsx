import React, { FC, useEffect } from 'react'

import { TaskListItemModel } from 'modules/task/features/TaskList/models'
import useCreateTaskReclassificationRequest from 'modules/task/features/TaskView/hooks/useCreateTaskReclassificationRequest'
import useDeleteTaskWorkGroup from 'modules/task/features/TaskView/hooks/useDeleteTaskWorkGroup'
import useGetTask from 'modules/task/features/TaskView/hooks/useGetTask'
import useGetTaskReclassificationRequest from 'modules/task/features/TaskView/hooks/useGetTaskReclassificationRequest'
import useResolveTask from 'modules/task/features/TaskView/hooks/useResolveTask'
import useTakeTask from 'modules/task/features/TaskView/hooks/useTakeTask'
import useUpdateTaskAssignee from 'modules/task/features/TaskView/hooks/useUpdateTaskAssignee'
import useUpdateTaskWorkGroup from 'modules/task/features/TaskView/hooks/useUpdateTaskWorkGroup'
import { useTaskExtendedStatus } from 'modules/task/hooks'
import useGetWorkGroupList from 'modules/workGroup/features/WorkGroupList/hooks/useGetWorkGroupList'

import TaskDetails from '../TaskDetails'

export type TaskDetailsContainerProps = {
  taskId: TaskListItemModel['id']

  additionalInfoExpanded: boolean
  onExpandAdditionalInfo: () => void

  closeTaskDetails: () => void
}

const TaskDetailsContainer: FC<TaskDetailsContainerProps> = ({
  taskId,

  additionalInfoExpanded,
  onExpandAdditionalInfo,

  closeTaskDetails,
}) => {
  const {
    currentData: task = null,
    isFetching: taskIsFetching,
    isError: isGetTaskError,
    startedTimeStamp: getTaskStartedTimeStamp = 0,
  } = useGetTask(taskId)

  const taskExtendedStatus = useTaskExtendedStatus(task?.extendedStatus)

  const {
    fn: createReclassificationRequest,
    state: {
      isLoading: createReclassificationRequestIsLoading,
      data: createReclassificationRequestResult = null,
      reset: resetCreateReclassificationRequestData,
      fulfilledTimeStamp: createReclassificationRequestFulfilledTimeStamp = 0,
    },
  } = useCreateTaskReclassificationRequest()

  const {
    currentData: getReclassificationRequestResult = null,
    isFetching: reclassificationRequestIsFetching,
  } = useGetTaskReclassificationRequest(taskId, {
    skip:
      !taskExtendedStatus.isInReclassification ||
      !!createReclassificationRequestResult,
  })

  const getTaskCalledAfterSuccessfullyRequestCreation =
    getTaskStartedTimeStamp > createReclassificationRequestFulfilledTimeStamp

  const {
    fn: takeTask,
    state: { isLoading: takeTaskIsLoading },
  } = useTakeTask()

  const { data: workGroupList = [], isFetching: workGroupListIsFetching } =
    useGetWorkGroupList()

  const {
    fn: resolveTask,
    state: { isLoading: isTaskResolving },
  } = useResolveTask()

  const {
    fn: updateWorkGroup,
    state: { isLoading: updateWorkGroupIsLoading },
  } = useUpdateTaskWorkGroup()

  const {
    fn: deleteWorkGroup,
    state: { isLoading: deleteWorkGroupIsLoading },
  } = useDeleteTaskWorkGroup()

  const {
    fn: updateAssignee,
    state: { isLoading: updateAssigneeIsLoading },
  } = useUpdateTaskAssignee()

  useEffect(() => {
    if (
      createReclassificationRequestResult &&
      getTaskCalledAfterSuccessfullyRequestCreation
    ) {
      resetCreateReclassificationRequestData()
    }
  }, [
    createReclassificationRequestResult,
    getTaskCalledAfterSuccessfullyRequestCreation,
    resetCreateReclassificationRequestData,
  ])

  return (
    <TaskDetails
      details={task}
      taskIsLoading={taskIsFetching}
      takeTask={takeTask}
      takeTaskIsLoading={takeTaskIsLoading}
      resolveTask={resolveTask}
      isTaskResolving={isTaskResolving}
      updateAssignee={updateAssignee}
      updateAssigneeIsLoading={updateAssigneeIsLoading}
      reclassificationRequest={
        createReclassificationRequestResult || getReclassificationRequestResult
      }
      reclassificationRequestIsLoading={reclassificationRequestIsFetching}
      createReclassificationRequest={createReclassificationRequest}
      createReclassificationRequestIsLoading={
        createReclassificationRequestIsLoading
      }
      workGroupList={workGroupList}
      workGroupListIsLoading={workGroupListIsFetching}
      updateWorkGroup={updateWorkGroup}
      updateWorkGroupIsLoading={updateWorkGroupIsLoading}
      deleteWorkGroup={deleteWorkGroup}
      deleteWorkGroupIsLoading={deleteWorkGroupIsLoading}
      additionalInfoExpanded={additionalInfoExpanded}
      onExpandAdditionalInfo={onExpandAdditionalInfo}
      closeTaskDetails={closeTaskDetails}
      isGetTaskError={isGetTaskError}
    />
  )
}

export default TaskDetailsContainer
