import React, { FC, useEffect } from 'react'

import { TaskDetailsTabsEnum } from 'modules/task/constants/task'
import {
  useGetTask,
  useResolveTask,
  useTakeTask,
  useTaskExtendedStatus,
} from 'modules/task/hooks/task'
import { useUpdateTaskAssignee } from 'modules/task/hooks/taskAssignee'
import {
  useCreateTaskReclassificationRequest,
  useGetTaskReclassificationRequest,
} from 'modules/task/hooks/taskReclassificationRequest'
import {
  useCreateTaskSuspendRequest,
  useDeleteTaskSuspendRequest,
} from 'modules/task/hooks/taskSuspendRequest'
import { useDeleteTaskWorkGroup, useUpdateTaskWorkGroup } from 'modules/task/hooks/taskWorkGroup'
import { useGetTaskWorkPerformedActMutation } from 'modules/task/services/taskApi.service'

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

  const {
    fn: updateWorkGroup,
    state: { isLoading: updateWorkGroupIsLoading },
  } = useUpdateTaskWorkGroup()

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
