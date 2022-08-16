import { useBoolean } from 'ahooks'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC, useCallback } from 'react'

import useCheckUserAuthenticated from 'modules/auth/hooks/useCheckUserAuthenticated'
import useCreateTaskReclassificationRequest from 'modules/task/components/TaskView/hooks/useCreateTaskReclassificationRequest'
import useResolveTask from 'modules/task/components/TaskView/hooks/useResolveTask'
import useUpdateTaskAssignee from 'modules/task/components/TaskView/hooks/useUpdateTaskAssignee'
import useUpdateTaskWorkGroup from 'modules/task/components/TaskView/hooks/useUpdateTaskWorkGroup'
import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import getTransferTaskSecondLineErrors from 'modules/task/components/TaskView/utils/getTransferTaskSecondLineErrors'
import { WorkGroupListItemModel } from 'modules/workGroup/components/WorkGroupList/models'
import useDebounceFn from 'shared/hooks/useDebounceFn'
import { AssigneeModel } from 'shared/interfaces/models'
import { MaybeNull } from 'shared/interfaces/utils'
import { ErrorResponse } from 'shared/services/api'
import handleSetFieldsErrors from 'shared/utils/form/handleSetFieldsErrors'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'
import showMultipleErrorNotification from 'shared/utils/notifications/showMultipleErrorNotification'

import useGetTaskReclassificationRequest from '../../hooks/useGetTaskReclassificationRequest'
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
import TaskDetailsTabs from './TaskDetailsTabs'
import { TaskDetailsTabsEnum } from './TaskDetailsTabs/constants'

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
  workGroupList: Array<WorkGroupListItemModel>
  workGroupListIsLoading: boolean
  onClose: () => void
  onTaskResolved: () => void
  refetchTask: () => void
  refetchTaskList: () => void
  getWorkGroupListError?: ErrorResponse
}

const TaskDetails: FC<TaskDetailsProps> = ({
  details,
  taskIsLoading,
  workGroupList,
  workGroupListIsLoading,
  getWorkGroupListError,
  onClose,
  onTaskResolved,
  refetchTask,
  refetchTaskList,
}) => {
  const breakpoints = useBreakpoint()
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
    data: reclassificationRequest,
    isFetching: reclassificationRequestIsFetching,
  } = useGetTaskReclassificationRequest(details?.id)

  const {
    fn: createTaskReclassificationRequest,
    state: { isLoading: createTaskReclassificationRequestIsLoading },
  } = useCreateTaskReclassificationRequest()

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
        await resolveTask({ taskId: details!.id, ...values })
        onTaskResolved()
      } catch (exception) {
        const error = exception as ErrorResponse<TaskResolutionFormErrors>
        handleSetFieldsErrors(error, setFields)
      }
    },
    [details, onTaskResolved, resolveTask],
  )

  const handleReclassificationRequestSubmit = useCallback<
    TaskReclassificationModalProps['onSubmit']
  >(
    async (values, setFields) => {
      try {
        await createTaskReclassificationRequest({
          taskId: details!.id,
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
      createTaskReclassificationRequest,
      details,
    ],
  )

  const handleUpdateTaskWorkGroup = useCallback(
    async (
      workGroup: WorkGroupListItemModel['id'],
      closeTaskSecondLineModal: () => void,
    ) => {
      try {
        await updateTaskWorkGroup({ taskId: details!.id, workGroup })
        closeTaskSecondLineModal()
        onClose()
        refetchTaskList()
      } catch (exception) {
        const errors = getTransferTaskSecondLineErrors(
          exception as ErrorResponse,
        )
        showMultipleErrorNotification(errors)
      }
    },
    [details, onClose, refetchTaskList, updateTaskWorkGroup],
  )

  const handleUpdateTaskAssignee = useCallback(
    async (assignee: AssigneeModel['id']) => {
      try {
        await updateTaskAssignee({ taskId: details!.id, assignee })
        refetchTask()
      } catch {
        showErrorNotification('Невозможно изменить исполнителя')
      }
    },
    [details, refetchTask, updateTaskAssignee],
  )

  const cardTitle = !taskIsLoading && details && (
    <CardTitle
      id={details.id}
      status={details.status}
      olaStatus={details.olaStatus}
      isAssignedToCurrentUser={isAssignedToCurrentUser}
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
        {reclassificationRequest && (
          <>
            <TaskRequestStatus
              title='Запрошена переклассификация:'
              comment={reclassificationRequest.comment.text}
              createdAt={reclassificationRequest.createdAt}
              user={reclassificationRequest.user}
              actionText='Отменить запрос'
              onAction={() => {}}
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
              assignee={details.assignee}
              workGroup={details.workGroup}
              workGroupList={workGroupList}
              workGroupListIsLoading={workGroupListIsLoading}
              getWorkGroupListError={getWorkGroupListError}
              transferTask={handleUpdateTaskWorkGroup}
              transferTaskIsLoading={updateTaskWorkGroupIsLoading}
              updateTaskAssignee={handleUpdateTaskAssignee}
              updateTaskAssigneeIsLoading={updateTaskAssigneeIsLoading}
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
                isLoading={createTaskReclassificationRequestIsLoading}
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
