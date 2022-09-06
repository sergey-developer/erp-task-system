import { useBoolean } from 'ahooks'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import _noop from 'lodash/noop'
import React, { FC, useCallback } from 'react'

import useCheckUserAuthenticated from 'modules/auth/hooks/useCheckUserAuthenticated'
import useResolveTask from 'modules/task/features/TaskView/hooks/useResolveTask'
import useUpdateTaskAssignee from 'modules/task/features/TaskView/hooks/useUpdateTaskAssignee'
import useUpdateTaskWorkGroup from 'modules/task/features/TaskView/hooks/useUpdateTaskWorkGroup'
import {
  CreateTaskReclassificationRequestMutationArgsModel,
  TakeTaskMutationArgsModel,
  TaskDetailsModel,
  TaskDetailsReclassificationRequestModel,
} from 'modules/task/features/TaskView/models'
import { TaskAssigneeModel } from 'modules/task/models'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'
import useDebounceFn from 'shared/hooks/useDebounceFn'
import { MaybeNull } from 'shared/interfaces/utils'
import { ErrorResponse } from 'shared/services/api'
import handleSetFieldsErrors from 'shared/utils/form/handleSetFieldsErrors'

import TaskDetailsTabs from '../TaskDetailsTabs'
import { TaskDetailsTabsEnum } from '../TaskDetailsTabs/constants'
import TaskReclassificationModal, {
  TaskReclassificationModalProps,
} from '../TaskReclassificationModal'
import { TaskReclassificationRequestFormErrors } from '../TaskReclassificationModal/interfaces'
import TaskRequestStatus from '../TaskRequestStatus'
import TaskResolutionModal, {
  TaskResolutionModalProps,
} from '../TaskResolutionModal'
import { TaskResolutionFormErrors } from '../TaskResolutionModal/interfaces'
import CardTitle from './CardTitle'
import MainDetails from './MainDetails'
import SecondaryDetails from './SecondaryDetails'
import { CardStyled, DividerStyled, RootWrapperStyled } from './styles'

type TaskDetailsProps = {
  details: MaybeNull<
    Pick<
      TaskDetailsModel,
      | 'id'
      | 'recordId'
      | 'title'
      | 'createdAt'
      | 'name'
      | 'address'
      | 'contactService'
      | 'workGroup'
      | 'assignee'
      | 'status'
      | 'extendedStatus'
      | 'type'
      | 'techResolution'
      | 'userResolution'
      | 'description'
      | 'olaStatus'
      | 'olaEstimatedTime'
      | 'olaNextBreachTime'
    >
  >

  taskIsLoading: boolean

  reclassificationRequest: MaybeNull<TaskDetailsReclassificationRequestModel>
  createReclassificationRequest: (
    data: CreateTaskReclassificationRequestMutationArgsModel,
  ) => Promise<void>
  reclassificationRequestIsCreating: boolean

  takeTask: (data: TakeTaskMutationArgsModel) => Promise<void>
  takeTaskIsLoading: boolean

  workGroupList: Array<WorkGroupListItemModel>
  workGroupListIsLoading: boolean

  onClose: () => void
}

const TaskDetails: FC<TaskDetailsProps> = ({
  details,

  taskIsLoading,
  takeTask,
  takeTaskIsLoading,

  reclassificationRequest,
  reclassificationRequestIsCreating,
  createReclassificationRequest,

  workGroupList,
  workGroupListIsLoading,

  onClose,
}) => {
  const breakpoints = useBreakpoint()

  const hasReclassificationRequest = !!reclassificationRequest

  const isAssignedToCurrentUser = useCheckUserAuthenticated(
    details?.assignee?.id,
  )

  const [
    isTaskResolutionModalOpened,
    { setTrue: openTaskResolutionModal, setFalse: closeTaskResolutionModal },
  ] = useBoolean(false)

  const debouncedOpenTaskResolutionModal = useDebounceFn(
    openTaskResolutionModal,
  )

  const [
    isTaskReclassificationModalOpened,
    {
      setTrue: openTaskReclassificationModal,
      setFalse: closeTaskReclassificationModal,
    },
  ] = useBoolean(false)

  const debouncedOpenTaskReclassificationModal = useDebounceFn(
    openTaskReclassificationModal,
  )

  const {
    fn: resolveTask,
    state: { isLoading: isTaskResolving },
  } = useResolveTask()

  const {
    fn: updateTaskWorkGroup,
    state: { isLoading: updateTaskWorkGroupIsLoading },
  } = useUpdateTaskWorkGroup()

  const {
    fn: updateTaskAssignee,
    state: { isLoading: updateTaskAssigneeIsLoading },
  } = useUpdateTaskAssignee()

  const handleResolutionSubmit = useCallback<
    TaskResolutionModalProps['onSubmit']
  >(
    async (values, setFields) => {
      try {
        await resolveTask({ taskId: details?.id!, ...values })
        onClose()
      } catch (exception) {
        const error = exception as ErrorResponse<TaskResolutionFormErrors>
        handleSetFieldsErrors(error, setFields)
      }
    },
    [details?.id, onClose, resolveTask],
  )

  const handleReclassificationRequestSubmit = useCallback<
    TaskReclassificationModalProps['onSubmit']
  >(
    async (values, setFields) => {
      try {
        await createReclassificationRequest({
          taskId: details?.id!,
          ...values,
        })
        closeTaskReclassificationModal()
      } catch (exception) {
        const error =
          exception as ErrorResponse<TaskReclassificationRequestFormErrors>
        handleSetFieldsErrors(error, setFields)
      }
    },
    [
      closeTaskReclassificationModal,
      createReclassificationRequest,
      details?.id,
    ],
  )

  const handleUpdateTaskWorkGroup = useCallback(
    async (
      workGroup: WorkGroupListItemModel['id'],
      closeTaskSecondLineModal: () => void,
    ) => {
      await updateTaskWorkGroup({ taskId: details?.id!, workGroup })
      closeTaskSecondLineModal()
      onClose()
    },
    [details?.id, onClose, updateTaskWorkGroup],
  )

  const handleUpdateTaskAssignee = useCallback(
    async (assignee: TaskAssigneeModel['id']) => {
      await updateTaskAssignee({ taskId: details?.id!, assignee })
    },
    [details?.id, updateTaskAssignee],
  )

  const debouncedTakeTask = useDebounceFn(takeTask)

  const handleTakeTask = useCallback(async () => {
    await debouncedTakeTask({ taskId: details?.id! })
  }, [debouncedTakeTask, details?.id])

  const cardTitle = !taskIsLoading && details && (
    <CardTitle
      id={details.id}
      type={details.type}
      status={details.status}
      olaStatus={details.olaStatus}
      isAssignedToCurrentUser={isAssignedToCurrentUser}
      hasReclassificationRequest={hasReclassificationRequest}
      onClose={onClose}
      onClickExecuteTask={debouncedOpenTaskResolutionModal}
      onClickRequestReclassification={debouncedOpenTaskReclassificationModal}
    />
  )

  return (
    <RootWrapperStyled>
      <CardStyled
        title={cardTitle}
        loading={taskIsLoading}
        $breakpoints={breakpoints}
      >
        {hasReclassificationRequest && (
          <>
            <TaskRequestStatus
              title='Запрошена переклассификация:'
              comment={reclassificationRequest!.comment.text}
              createdAt={reclassificationRequest!.createdAt}
              user={reclassificationRequest!.user}
              actionText='Отменить запрос'
              onAction={_noop}
            />

            <DividerStyled />
          </>
        )}

        {details && (
          <>
            <MainDetails
              recordId={details.recordId}
              title={details.title}
              createdAt={details.createdAt}
              name={details.name}
              address={details.address}
              contactService={details.contactService}
              olaStatus={details.olaStatus}
              olaEstimatedTime={details.olaEstimatedTime}
              olaNextBreachTime={details.olaNextBreachTime}
            />

            <DividerStyled />

            <SecondaryDetails
              id={details.id}
              status={details.status}
              extendedStatus={details.extendedStatus}
              assignee={details.assignee}
              workGroup={details.workGroup}
              workGroupList={workGroupList}
              workGroupListIsLoading={workGroupListIsLoading}
              transferTask={handleUpdateTaskWorkGroup}
              transferTaskIsLoading={updateTaskWorkGroupIsLoading}
              updateTaskAssignee={handleUpdateTaskAssignee}
              updateTaskAssigneeIsLoading={updateTaskAssigneeIsLoading}
              hasReclassificationRequest={hasReclassificationRequest}
              takeTask={handleTakeTask}
              takeTaskIsLoading={takeTaskIsLoading}
            />

            <TaskDetailsTabs
              details={details}
              defaultTab={TaskDetailsTabsEnum.Description}
            />

            {isTaskResolutionModalOpened && (
              <TaskResolutionModal
                visible
                isTaskResolving={isTaskResolving}
                onCancel={closeTaskResolutionModal}
                onSubmit={handleResolutionSubmit}
                recordId={details.recordId}
                type={details.type}
              />
            )}

            {isTaskReclassificationModalOpened && (
              <TaskReclassificationModal
                visible
                recordId={details.recordId}
                isLoading={reclassificationRequestIsCreating}
                onSubmit={handleReclassificationRequestSubmit}
                onCancel={closeTaskReclassificationModal}
              />
            )}
          </>
        )}
      </CardStyled>
    </RootWrapperStyled>
  )
}

export default TaskDetails
