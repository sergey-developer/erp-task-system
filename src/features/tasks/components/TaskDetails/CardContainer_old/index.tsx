import { useGetTaskWorkPerformedActMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import { TaskDetailsTabsEnum } from 'features/tasks/constants'
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
} from 'features/tasks/hooks'
import React, { FC, useEffect } from 'react'

import { IdType } from 'shared/types/common'
import { EmptyFn } from 'shared/types/utils'

import Card from '../Card_old'

export type TaskCardContainerProps = {
  taskId: IdType

  additionalInfoExpanded: boolean
  onExpandAdditionalInfo: EmptyFn

  closeTaskCard: EmptyFn

  activeTab?: TaskDetailsTabsEnum
}

const TaskCardContainer: FC<TaskCardContainerProps> = ({
  taskId,

  additionalInfoExpanded,
  onExpandAdditionalInfo,

  activeTab,

  closeTaskCard,
}) => {
  const {
    refetch: refetchTask,
    currentData: task = null,
    isFetching: taskIsFetching,
    isError: isGetTaskError,
    startedTimeStamp: getTaskStartedTimeStamp = 0,
  } = useGetTask(taskId)

  const taskExtendedStatus = useTaskExtendedStatus(task?.extendedStatus)

  const [deleteSuspendRequest, { isLoading: deleteSuspendRequestIsLoading }] =
    useDeleteTaskSuspendRequest()

  const [createSuspendRequest, { isLoading: createSuspendRequestIsLoading }] =
    useCreateTaskSuspendRequest()

  const [
    createReclassificationRequest,
    {
      isLoading: createReclassificationRequestIsLoading,
      data: createReclassificationRequestResult,
      reset: resetCreateReclassificationRequestData,
      fulfilledTimeStamp: createReclassificationRequestFulfilledTimeStamp = 0,
    },
  ] = useCreateTaskReclassificationRequest()

  const {
    currentData: getReclassificationRequestResult = null,
    isFetching: reclassificationRequestIsFetching,
  } = useGetTaskReclassificationRequest(
    { taskId },
    {
      skip: !taskExtendedStatus.isInReclassification || !!createReclassificationRequestResult,
    },
  )

  const getTaskCalledAfterSuccessfullyRequestCreation =
    getTaskStartedTimeStamp > createReclassificationRequestFulfilledTimeStamp

  const [takeTask, { isLoading: takeTaskIsLoading }] = useTakeTask()
  const [resolveTask, { isLoading: taskIsResolving }] = useResolveTask()
  const [updateWorkGroup, { isLoading: updateWorkGroupIsLoading }] = useUpdateTaskWorkGroup()
  const [deleteWorkGroup, { isLoading: deleteWorkGroupIsLoading }] = useDeleteTaskWorkGroup()
  const [updateAssignee, { isLoading: updateAssigneeIsLoading }] = useUpdateTaskAssignee()

  const [getTaskWorkPerformedAct, { isLoading: taskWorkPerformedActIsLoading }] =
    useGetTaskWorkPerformedActMutation()

  useEffect(() => {
    if (createReclassificationRequestResult && getTaskCalledAfterSuccessfullyRequestCreation) {
      resetCreateReclassificationRequestData()
    }
  }, [
    createReclassificationRequestResult,
    getTaskCalledAfterSuccessfullyRequestCreation,
    resetCreateReclassificationRequestData,
  ])

  return (
    <Card
      task={task}
      taskIsLoading={taskIsFetching}
      refetchTask={refetchTask}
      takeTask={takeTask}
      takeTaskIsLoading={takeTaskIsLoading}
      resolveTask={resolveTask}
      taskIsResolving={taskIsResolving}
      getTaskWorkPerformedAct={getTaskWorkPerformedAct}
      taskWorkPerformedActIsLoading={taskWorkPerformedActIsLoading}
      updateAssignee={updateAssignee}
      updateAssigneeIsLoading={updateAssigneeIsLoading}
      reclassificationRequest={
        createReclassificationRequestResult || getReclassificationRequestResult
      }
      reclassificationRequestIsLoading={reclassificationRequestIsFetching}
      createReclassificationRequest={createReclassificationRequest}
      createReclassificationRequestIsLoading={createReclassificationRequestIsLoading}
      createSuspendRequest={createSuspendRequest}
      createSuspendRequestIsLoading={createSuspendRequestIsLoading}
      cancelSuspendRequest={deleteSuspendRequest}
      cancelSuspendRequestIsLoading={deleteSuspendRequestIsLoading}
      updateWorkGroup={updateWorkGroup}
      updateWorkGroupIsLoading={updateWorkGroupIsLoading}
      deleteWorkGroup={deleteWorkGroup}
      deleteWorkGroupIsLoading={deleteWorkGroupIsLoading}
      additionalInfoExpanded={additionalInfoExpanded}
      onExpandAdditionalInfo={onExpandAdditionalInfo}
      closeTaskCard={closeTaskCard}
      isGetTaskError={isGetTaskError}
      activeTab={activeTab}
    />
  )
}

export default TaskCardContainer
