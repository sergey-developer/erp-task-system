import React, { FC, useEffect } from 'react'

import {
  useCreateTaskReclassificationRequest,
  useCreateTaskSuspendRequest,
  useDeleteTaskSuspendRequest,
  useDeleteTaskWorkGroup,
  useGetTask,
  useGetTaskReclassificationRequest,
  useResolveTask,
  useTakeTask,
  useTaskExtendedStatus,
  useUpdateTaskAssignee,
  useUpdateTaskWorkGroup,
} from 'modules/task/hooks'
import { TaskListItemModel } from 'modules/task/models'
import { useGetWorkGroupList } from 'modules/workGroup/hooks'

import Card from '../Card'

export type TaskCardContainerProps = {
  taskId: TaskListItemModel['id']

  additionalInfoExpanded: boolean
  onExpandAdditionalInfo: () => void

  closeTaskCard: () => void
}

const TaskCardContainer: FC<TaskCardContainerProps> = ({
  taskId,

  additionalInfoExpanded,
  onExpandAdditionalInfo,

  closeTaskCard,
}) => {
  const {
    currentData: task = null,
    isFetching: taskIsFetching,
    isError: isGetTaskError,
    startedTimeStamp: getTaskStartedTimeStamp = 0,
  } = useGetTask(taskId)

  const taskExtendedStatus = useTaskExtendedStatus(task?.extendedStatus)

  const {
    fn: deleteSuspendRequest,
    state: { isLoading: deleteSuspendRequestIsLoading },
  } = useDeleteTaskSuspendRequest()

  const {
    fn: createSuspendRequest,
    state: { isLoading: createSuspendRequestIsLoading },
  } = useCreateTaskSuspendRequest()

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
    <Card
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
      createSuspendRequest={createSuspendRequest}
      createSuspendRequestIsLoading={createSuspendRequestIsLoading}
      cancelSuspendRequest={deleteSuspendRequest}
      cancelSuspendRequestIsLoading={deleteSuspendRequestIsLoading}
      workGroupList={workGroupList}
      workGroupListIsLoading={workGroupListIsFetching}
      updateWorkGroup={updateWorkGroup}
      updateWorkGroupIsLoading={updateWorkGroupIsLoading}
      deleteWorkGroup={deleteWorkGroup}
      deleteWorkGroupIsLoading={deleteWorkGroupIsLoading}
      additionalInfoExpanded={additionalInfoExpanded}
      onExpandAdditionalInfo={onExpandAdditionalInfo}
      closeTaskCard={closeTaskCard}
      isGetTaskError={isGetTaskError}
    />
  )
}

export default TaskCardContainer
