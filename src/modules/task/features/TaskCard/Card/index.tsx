import { useBoolean } from 'ahooks'
import { FormInstance } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import noop from 'lodash/noop'
import moment from 'moment'
import React, { FC, useCallback, useEffect } from 'react'

import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import {
  taskImpactMap,
  taskPriorityMap,
  taskSeverityMap,
} from 'modules/task/constants/dictionary'
import { useTaskStatus, useTaskSuspendRequestStatus } from 'modules/task/hooks'
import {
  CreateTaskReclassificationRequestMutationArgs,
  CreateTaskSuspendRequestBadRequestErrorResponse,
  CreateTaskSuspendRequestMutationArgs,
  DeleteTaskSuspendRequestMutationArgs,
  DeleteTaskWorkGroupMutationArgs,
  ResolveTaskMutationArgs,
  TakeTaskMutationArgs,
  TaskAssigneeModel,
  TaskModel,
  TaskReclassificationRequestModel,
  UpdateTaskAssigneeMutationArgs,
  UpdateTaskWorkGroupMutationArgs,
} from 'modules/task/models'
import { useUserRole } from 'modules/user/hooks'
import { WorkGroupListModel } from 'modules/workGroup/models'

import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { useDebounceFn } from 'shared/hooks'
import { MaybeNull } from 'shared/interfaces/utils'
import { ErrorResponse, isBadRequestError } from 'shared/services/api'
import { formatDate } from 'shared/utils/date'
import { handleSetFieldsErrors } from 'shared/utils/form'

import AdditionalInfo from '../AdditionalInfo'
import CardTabs from '../CardTabs'
import CardTitle from '../CardTitle'
import MainDetails from '../MainDetails'
import { RequestTaskReclassificationModalProps } from '../RequestTaskReclassificationModal'
import { RequestTaskSuspendModalProps } from '../RequestTaskSuspendModal'
import { RequestTaskSuspendFormFields } from '../RequestTaskSuspendModal/interfaces'
import { getFormErrorsFromBadRequestError } from '../RequestTaskSuspendModal/utils'
import SecondaryDetails from '../SecondaryDetails'
import { TaskFirstLineFormFields } from '../TaskFirstLineModal/interfaces'
import { TaskResolutionModalProps } from '../TaskResolutionModal'
import { TaskSecondLineFormFields } from '../TaskSecondLineModal/interfaces'
import { CardStyled, DividerStyled, RootWrapperStyled } from './styles'

const TaskResolutionModal = React.lazy(() => import('../TaskResolutionModal'))

const RequestTaskReclassificationModal = React.lazy(
  () => import('../RequestTaskReclassificationModal'),
)

const TaskReclassificationRequest = React.lazy(
  () => import('../TaskReclassificationRequest'),
)

const RequestTaskSuspendModal = React.lazy(
  () => import('../RequestTaskSuspendModal'),
)

const TaskSuspendRequest = React.lazy(() => import('../TaskSuspendRequest'))

export type TaskCardProps = {
  task: MaybeNull<
    Pick<
      TaskModel,
      | 'id'
      | 'recordId'
      | 'title'
      | 'createdAt'
      | 'name'
      | 'address'
      | 'contactService'
      | 'contactPhone'
      | 'portablePhone'
      | 'workGroup'
      | 'assignee'
      | 'status'
      | 'extendedStatus'
      | 'type'
      | 'description'
      | 'olaStatus'
      | 'olaEstimatedTime'
      | 'olaNextBreachTime'
      | 'initialImpact'
      | 'severity'
      | 'priorityCode'
      | 'weight'
      | 'company'
      | 'email'
      | 'sapId'
      | 'supportGroup'
      | 'contactType'
      | 'productClassifier1'
      | 'productClassifier2'
      | 'productClassifier3'
      | 'latitude'
      | 'longitude'
      | 'suspendRequest'
      | 'techResolution'
      | 'userResolution'
    >
  >

  taskIsLoading: boolean
  refetchTask: () => void
  reclassificationRequest: MaybeNull<TaskReclassificationRequestModel>
  reclassificationRequestIsLoading: boolean
  createReclassificationRequest: (
    data: CreateTaskReclassificationRequestMutationArgs,
  ) => Promise<void>
  createReclassificationRequestIsLoading: boolean

  createSuspendRequest: (
    data: CreateTaskSuspendRequestMutationArgs,
  ) => Promise<void>
  createSuspendRequestIsLoading: boolean
  cancelSuspendRequest: (
    data: DeleteTaskSuspendRequestMutationArgs,
  ) => Promise<void>
  cancelSuspendRequestIsLoading: boolean

  takeTask: (data: TakeTaskMutationArgs) => Promise<void>
  takeTaskIsLoading: boolean

  resolveTask: (data: ResolveTaskMutationArgs) => Promise<void>
  isTaskResolving: boolean

  updateAssignee: (data: UpdateTaskAssigneeMutationArgs) => Promise<void>
  updateAssigneeIsLoading: boolean

  workGroupList: WorkGroupListModel
  workGroupListIsLoading: boolean
  updateWorkGroup: (data: UpdateTaskWorkGroupMutationArgs) => Promise<void>
  updateWorkGroupIsLoading: boolean
  deleteWorkGroup: (data: DeleteTaskWorkGroupMutationArgs) => Promise<void>
  deleteWorkGroupIsLoading: boolean

  additionalInfoExpanded: boolean
  onExpandAdditionalInfo: () => void

  closeTaskCard: () => void

  isGetTaskError: boolean
}

const TaskCard: FC<TaskCardProps> = ({
  task,
  taskIsLoading,
  refetchTask,
  takeTask,
  takeTaskIsLoading,
  resolveTask,
  isTaskResolving,

  reclassificationRequest,
  reclassificationRequestIsLoading,
  createReclassificationRequest,
  createReclassificationRequestIsLoading,

  createSuspendRequest,
  createSuspendRequestIsLoading,
  cancelSuspendRequest,
  cancelSuspendRequestIsLoading,

  workGroupList,
  workGroupListIsLoading,
  updateWorkGroup,
  updateWorkGroupIsLoading,
  deleteWorkGroup,
  deleteWorkGroupIsLoading,

  updateAssignee,
  updateAssigneeIsLoading,

  additionalInfoExpanded,
  onExpandAdditionalInfo,

  closeTaskCard,

  isGetTaskError,
}) => {
  const breakpoints = useBreakpoint()

  const taskStatus = useTaskStatus(task?.status)
  const taskSuspendRequestStatus = useTaskSuspendRequestStatus(
    task?.suspendRequest?.status,
  )

  const userRole = useUserRole()
  const isAssignedToCurrentUser = useCheckUserAuthenticated(task?.assignee?.id)

  const debouncedCloseTaskCard = useDebounceFn(closeTaskCard)

  const debouncedRefetchTask = useDebounceFn(refetchTask)

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

  const [
    isRequestTaskSuspendModalOpened,
    {
      setTrue: openRequestTaskSuspendModal,
      setFalse: closeRequestTaskSuspendModal,
    },
  ] = useBoolean(false)

  const debouncedOpenRequestTaskSuspendModal = useDebounceFn(
    openRequestTaskSuspendModal,
  )

  useEffect(() => {
    if (isGetTaskError) closeTaskCard()
  }, [isGetTaskError, closeTaskCard])

  const handleResolutionSubmit = useCallback<
    TaskResolutionModalProps['onSubmit']
  >(
    async (values, setFields) => {
      if (!task) return

      try {
        await resolveTask({ taskId: task.id, ...values })
        closeTaskCard()
      } catch (exception) {
        const error = exception as ErrorResponse
        if (isBadRequestError(error)) {
          handleSetFieldsErrors(error, setFields)
        }
      }
    },
    [task, closeTaskCard, resolveTask],
  )

  const handleReclassificationRequestSubmit = useCallback<
    RequestTaskReclassificationModalProps['onSubmit']
  >(
    async (values, setFields) => {
      if (!task) return

      try {
        await createReclassificationRequest({
          taskId: task.id,
          ...values,
        })
        closeTaskReclassificationModal()
      } catch (exception) {
        const error = exception as ErrorResponse
        if (isBadRequestError(error)) {
          handleSetFieldsErrors(error, setFields)
        }
      }
    },
    [closeTaskReclassificationModal, createReclassificationRequest, task],
  )

  const handleTransferTaskToSecondLine = useCallback(
    async (
      values: TaskSecondLineFormFields,
      setFields: FormInstance['setFields'],
      closeTaskSecondLineModal: () => void,
    ) => {
      if (!task) return

      try {
        await updateWorkGroup({ taskId: task.id, ...values })
        closeTaskSecondLineModal()
        closeTaskCard()
      } catch (exception) {
        const error = exception as ErrorResponse
        if (isBadRequestError(error)) {
          handleSetFieldsErrors(error, setFields)
        }
      }
    },
    [task, closeTaskCard, updateWorkGroup],
  )

  const handleTransferTaskToFirstLine = useCallback(
    async (
      values: TaskFirstLineFormFields,
      setFields: FormInstance['setFields'],
      closeTaskFirstLineModal: () => void,
    ) => {
      if (!task) return

      try {
        await deleteWorkGroup({ taskId: task.id, ...values })
        closeTaskFirstLineModal()
        closeTaskCard()
      } catch (exception) {
        const error = exception as ErrorResponse
        if (isBadRequestError(error)) {
          handleSetFieldsErrors(error, setFields)
        }
      }
    },
    [closeTaskCard, deleteWorkGroup, task],
  )

  const handleUpdateAssignee = useCallback(
    async (assignee: TaskAssigneeModel['id']) => {
      if (!task) return

      try {
        await updateAssignee({ taskId: task.id, assignee })
      } catch {}
    },
    [task, updateAssignee],
  )

  const handleTakeTask = useCallback(async () => {
    if (!task) return

    try {
      await takeTask({ taskId: task.id })
    } catch {}
  }, [takeTask, task])

  const handleCreateTaskSuspendRequest: RequestTaskSuspendModalProps['onSubmit'] =
    useCallback(
      async (values: RequestTaskSuspendFormFields, setFields) => {
        if (!task) return

        try {
          await createSuspendRequest({
            taskId: task.id,
            comment: values.comment,
            suspendReason: values.reason,
            suspendEndAt: moment(values.endDate)
              .set('hours', values.endTime.get('hours'))
              .set('minutes', values.endTime.get('minutes'))
              .toISOString(),
          })

          closeRequestTaskSuspendModal()
        } catch (exception) {
          const error = exception as ErrorResponse

          if (isBadRequestError(error)) {
            const badRequestError =
              error as CreateTaskSuspendRequestBadRequestErrorResponse

            handleSetFieldsErrors(
              {
                ...badRequestError,
                data: getFormErrorsFromBadRequestError(badRequestError),
              },
              setFields,
            )
          }
        }
      },
      [closeRequestTaskSuspendModal, createSuspendRequest, task],
    )

  const handleCancelTaskSuspendRequest = useDebounceFn(async () => {
    if (!task) return

    try {
      await cancelSuspendRequest({ taskId: task.id })
    } catch {}
  }, [cancelSuspendRequest, task])

  const cardTitle = !taskIsLoading && task && (
    <CardTitle
      id={task.id}
      type={task.type}
      status={task.status}
      extendedStatus={task.extendedStatus}
      olaStatus={task.olaStatus}
      isAssignedToCurrentUser={isAssignedToCurrentUser}
      suspendRequest={task.suspendRequest}
      onClose={debouncedCloseTaskCard}
      onReloadTask={debouncedRefetchTask}
      onExecuteTask={debouncedOpenTaskResolutionModal}
      onRequestSuspend={debouncedOpenRequestTaskSuspendModal}
      onRequestReclassification={debouncedOpenTaskReclassificationModal}
    />
  )

  return (
    <RootWrapperStyled>
      <CardStyled
        data-testid='task-card'
        title={cardTitle}
        loading={taskIsLoading}
        $breakpoints={breakpoints}
      >
        <Space direction='vertical' $block size='middle'>
          {
            <LoadingArea
              data-testid='task-card-reclassification-request-spinner'
              isLoading={
                reclassificationRequestIsLoading ||
                createReclassificationRequestIsLoading
              }
              tip='Загрузка запроса на переклассификацию...'
              area='block'
            >
              {reclassificationRequest && (
                <React.Suspense fallback={<Spinner area='block' />}>
                  <TaskReclassificationRequest
                    comment={reclassificationRequest.comment.text}
                    date={reclassificationRequest.createdAt}
                    user={reclassificationRequest.user}
                    onCancel={noop}
                    cancelBtnDisabled={taskStatus.isAwaiting}
                  />
                </React.Suspense>
              )}
            </LoadingArea>
          }

          {task?.suspendRequest && (
            <React.Suspense fallback={<Spinner area='block' />}>
              <TaskSuspendRequest
                title={
                  taskSuspendRequestStatus.isNew ||
                  taskSuspendRequestStatus.isInProgress
                    ? 'Запрошено ожидание'
                    : taskSuspendRequestStatus.isApproved
                    ? 'Заявка находится в ожидании'
                    : ''
                }
                date={task.suspendRequest.suspendEndAt}
                user={task.suspendRequest.author}
                comment={task.suspendRequest.comment}
                action={
                  taskSuspendRequestStatus.isNew ||
                  taskSuspendRequestStatus.isInProgress
                    ? {
                        text: 'Отменить запрос',
                        onClick: handleCancelTaskSuspendRequest,
                        loading: cancelSuspendRequestIsLoading,
                        disabled: userRole.isEngineerRole,
                      }
                    : taskSuspendRequestStatus.isApproved
                    ? {
                        text: 'Вернуть в работу',
                        onClick: handleTakeTask,
                        loading: takeTaskIsLoading,
                      }
                    : undefined
                }
              />
            </React.Suspense>
          )}

          {task && (
            <Space
              data-testid='task-card-details'
              direction='vertical'
              $block
              size='middle'
            >
              <MainDetails
                recordId={task.recordId}
                status={task.status}
                title={task.title}
                createdAt={formatDate(task.createdAt, DATE_TIME_FORMAT)}
                name={task.name}
                address={task.address}
                contactService={task.contactService}
                contactPhone={task.contactPhone}
                portablePhone={task.portablePhone}
                olaStatus={task.olaStatus}
                olaEstimatedTime={task.olaEstimatedTime}
                olaNextBreachTime={task.olaNextBreachTime}
              />

              <AdditionalInfo
                email={task.email}
                sapId={task.sapId}
                weight={task.weight}
                address={task.address}
                company={task.company}
                contactType={task.contactType}
                severity={taskSeverityMap.get(task.severity)!}
                priority={taskPriorityMap.get(task.priorityCode)!}
                impact={taskImpactMap.get(task.initialImpact)!}
                supportGroup={task.supportGroup?.name}
                productClassifier1={task.productClassifier1}
                productClassifier2={task.productClassifier2}
                productClassifier3={task.productClassifier3}
                latitude={task.latitude}
                longitude={task.longitude}
                expanded={additionalInfoExpanded}
                onExpand={onExpandAdditionalInfo}
              />

              {!additionalInfoExpanded && <DividerStyled />}

              <SecondaryDetails
                id={task.id}
                recordId={task.recordId}
                status={task.status}
                extendedStatus={task.extendedStatus}
                assignee={task.assignee}
                workGroup={task.workGroup}
                workGroupList={workGroupList}
                workGroupListIsLoading={workGroupListIsLoading}
                transferTaskToFirstLine={handleTransferTaskToFirstLine}
                transferTaskToFirstLineIsLoading={deleteWorkGroupIsLoading}
                transferTaskToSecondLine={handleTransferTaskToSecondLine}
                transferTaskToSecondLineIsLoading={updateWorkGroupIsLoading}
                updateAssignee={handleUpdateAssignee}
                updateAssigneeIsLoading={updateAssigneeIsLoading}
                takeTask={handleTakeTask}
                takeTaskIsLoading={takeTaskIsLoading}
                taskSuspendRequestStatus={task.suspendRequest?.status}
              />

              <CardTabs task={task} />

              {isTaskResolutionModalOpened && (
                <React.Suspense
                  fallback={
                    <ModalFallback
                      visible={isTaskResolutionModalOpened}
                      onCancel={closeTaskResolutionModal}
                    />
                  }
                >
                  <TaskResolutionModal
                    type={task.type}
                    recordId={task.recordId}
                    isLoading={isTaskResolving}
                    onCancel={closeTaskResolutionModal}
                    onSubmit={handleResolutionSubmit}
                  />
                </React.Suspense>
              )}

              {isTaskReclassificationModalOpened && (
                <React.Suspense
                  fallback={
                    <ModalFallback
                      visible={isTaskReclassificationModalOpened}
                      onCancel={closeTaskReclassificationModal}
                    />
                  }
                >
                  <RequestTaskReclassificationModal
                    recordId={task.recordId}
                    isLoading={createReclassificationRequestIsLoading}
                    onSubmit={handleReclassificationRequestSubmit}
                    onCancel={closeTaskReclassificationModal}
                  />
                </React.Suspense>
              )}

              {isRequestTaskSuspendModalOpened && (
                <React.Suspense
                  fallback={
                    <ModalFallback
                      visible={isRequestTaskSuspendModalOpened}
                      onCancel={closeRequestTaskSuspendModal}
                    />
                  }
                >
                  <RequestTaskSuspendModal
                    recordId={task.recordId}
                    isLoading={createSuspendRequestIsLoading}
                    onSubmit={handleCreateTaskSuspendRequest}
                    onCancel={closeRequestTaskSuspendModal}
                  />
                </React.Suspense>
              )}
            </Space>
          )}
        </Space>
      </CardStyled>
    </RootWrapperStyled>
  )
}

export default TaskCard
