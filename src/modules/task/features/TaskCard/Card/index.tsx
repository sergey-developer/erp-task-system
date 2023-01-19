import { useBoolean } from 'ahooks'
import { FormInstance } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import noop from 'lodash/noop'
import moment from 'moment'
import React, { FC, useCallback, useEffect } from 'react'

import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import Spinner from 'components/Spinner'
import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import {
  taskImpactMap,
  taskPriorityMap,
  taskSeverityMap,
} from 'modules/task/constants/dictionary'
import { useTaskStatus, useTaskSuspendRequestStatus } from 'modules/task/hooks'
import {
  CreateTaskReclassificationRequestMutationArgsModel,
  CreateTaskSuspendRequestBadRequestErrorResponse,
  CreateTaskSuspendRequestMutationArgs,
  DeleteTaskSuspendRequestMutationArgsModel,
  DeleteTaskWorkGroupMutationArgsModel,
  ResolveTaskMutationArgsModel,
  TakeTaskMutationArgsModel,
  TaskAssigneeModel,
  TaskModel,
  TaskReclassificationRequestModel,
  UpdateTaskAssigneeMutationArgsModel,
  UpdateTaskWorkGroupMutationArgsModel,
} from 'modules/task/models'
import { WorkGroupListItemModel } from 'modules/workGroup/models'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { useDebounceFn } from 'shared/hooks'
import { MaybeNull } from 'shared/interfaces/utils'
import { ErrorResponse, isBadRequestError } from 'shared/services/api'
import { formatDate } from 'shared/utils/date'
import { handleSetFieldsErrors } from 'shared/utils/form'

import AdditionalInfo from '../AdditionalInfo'
import TaskCardTabs from '../CardTabs'
import CardTitle from '../CardTitle'
import MainDetails from '../MainDetails'
import { RequestTaskReclassificationModalProps } from '../RequestTaskReclassificationModal'
import { RequestTaskSuspendModalProps } from '../RequestTaskSuspendModal'
import {
  RequestTaskSuspendFormErrors,
  RequestTaskSuspendFormFields,
} from '../RequestTaskSuspendModal/interfaces'
import SecondaryDetails from '../SecondaryDetails'
import { TaskFirstLineFormFields } from '../TaskFirstLineModal/interfaces'
import { TaskResolutionModalProps } from '../TaskResolutionModal'
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
  details: MaybeNull<
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
    >
  >

  taskIsLoading: boolean

  reclassificationRequest: MaybeNull<TaskReclassificationRequestModel>
  reclassificationRequestIsLoading: boolean
  createReclassificationRequest: (
    data: CreateTaskReclassificationRequestMutationArgsModel,
  ) => Promise<void>
  createReclassificationRequestIsLoading: boolean

  createSuspendRequest: (
    data: CreateTaskSuspendRequestMutationArgs,
  ) => Promise<void>
  createSuspendRequestIsLoading: boolean
  cancelSuspendRequest: (
    data: DeleteTaskSuspendRequestMutationArgsModel,
  ) => Promise<void>
  cancelSuspendRequestIsLoading: boolean

  takeTask: (data: TakeTaskMutationArgsModel) => Promise<void>
  takeTaskIsLoading: boolean

  resolveTask: (data: ResolveTaskMutationArgsModel) => Promise<void>
  isTaskResolving: boolean

  updateAssignee: (data: UpdateTaskAssigneeMutationArgsModel) => Promise<void>
  updateAssigneeIsLoading: boolean

  workGroupList: Array<WorkGroupListItemModel>
  workGroupListIsLoading: boolean
  updateWorkGroup: (data: UpdateTaskWorkGroupMutationArgsModel) => Promise<void>
  updateWorkGroupIsLoading: boolean
  deleteWorkGroup: (data: DeleteTaskWorkGroupMutationArgsModel) => Promise<void>
  deleteWorkGroupIsLoading: boolean

  additionalInfoExpanded: boolean
  onExpandAdditionalInfo: () => void

  closeTaskCard: () => void

  isGetTaskError: boolean
}

const TaskCard: FC<TaskCardProps> = ({
  details,

  taskIsLoading,
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
  const taskStatus = useTaskStatus(details?.status)
  const taskSuspendRequestStatusMap = useTaskSuspendRequestStatus(
    details?.suspendRequest?.status,
  )

  const isAssignedToCurrentUser = useCheckUserAuthenticated(
    details?.assignee?.id,
  )

  const debouncedCloseTaskCard = useDebounceFn(closeTaskCard)

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
      if (!details) return

      try {
        await resolveTask({ taskId: details.id, ...values })
        closeTaskCard()
      } catch (exception) {
        const error = exception as ErrorResponse
        if (isBadRequestError(error)) {
          handleSetFieldsErrors(error, setFields)
        }
      }
    },
    [details, closeTaskCard, resolveTask],
  )

  const handleReclassificationRequestSubmit = useCallback<
    RequestTaskReclassificationModalProps['onSubmit']
  >(
    async (values, setFields) => {
      if (!details) return

      try {
        await createReclassificationRequest({
          taskId: details.id,
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
    [closeTaskReclassificationModal, createReclassificationRequest, details],
  )

  const handleTransferTaskToSecondLine = useCallback(
    async (
      workGroup: WorkGroupListItemModel['id'],
      closeTaskSecondLineModal: () => void,
    ) => {
      if (!details) return

      try {
        await updateWorkGroup({ taskId: details.id, workGroup })
        closeTaskSecondLineModal()
        closeTaskCard()
      } catch {
        // todo: использовать в модалке форму и реализовать обработку ошибок. затем поправить тесты
      }
    },
    [details, closeTaskCard, updateWorkGroup],
  )

  const handleTransferTaskToFirstLine = useCallback(
    async (
      values: TaskFirstLineFormFields,
      setFields: FormInstance['setFields'],
      closeTaskFirstLineModal: () => void,
    ) => {
      if (!details) return

      try {
        await deleteWorkGroup({ taskId: details.id, ...values })
        closeTaskFirstLineModal()
        closeTaskCard()
      } catch (exception) {
        const error = exception as ErrorResponse
        if (isBadRequestError(error)) {
          handleSetFieldsErrors(error, setFields)
        }
      }
    },
    [closeTaskCard, deleteWorkGroup, details],
  )

  const handleUpdateAssignee = useCallback(
    async (assignee: TaskAssigneeModel['id']) => {
      if (!details) return

      try {
        await updateAssignee({ taskId: details.id, assignee })
      } catch {}
    },
    [details, updateAssignee],
  )

  const handleTakeTask = useCallback(async () => {
    if (!details) return

    try {
      await takeTask({ taskId: details.id })
    } catch {}
  }, [takeTask, details])

  const handleCreateTaskSuspendRequest: RequestTaskSuspendModalProps['onSubmit'] =
    useCallback(
      async (values: RequestTaskSuspendFormFields, setFields) => {
        if (!details) return

        try {
          await createSuspendRequest({
            taskId: details.id,
            comment: values.comment,
            suspendReason: values.suspendReason,
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

            const formErrors: RequestTaskSuspendFormErrors = {
              comment: badRequestError.data.comment,
              suspendReason: badRequestError.data.suspendReason,
              endDate: badRequestError.data.suspendEndAt,
              endTime: badRequestError.data.suspendEndAt,
            }

            handleSetFieldsErrors(
              {
                ...badRequestError,
                data: formErrors,
              },
              setFields,
            )
          }
        }
      },
      [closeRequestTaskSuspendModal, createSuspendRequest, details],
    )

  const handleCancelTaskSuspendRequest = useCallback(async () => {
    if (!details) return

    try {
      await cancelSuspendRequest({ taskId: details.id })
    } catch {}
  }, [cancelSuspendRequest, details])

  const cardTitle = !taskIsLoading && details && (
    <CardTitle
      id={details.id}
      type={details.type}
      status={details.status}
      extendedStatus={details.extendedStatus}
      olaStatus={details.olaStatus}
      isAssignedToCurrentUser={isAssignedToCurrentUser}
      onClose={debouncedCloseTaskCard}
      onClickExecuteTask={debouncedOpenTaskResolutionModal}
      onClickRequestSuspend={debouncedOpenRequestTaskSuspendModal}
      onClickRequestReclassification={debouncedOpenTaskReclassificationModal}
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

          {details?.suspendRequest && (
            <React.Suspense fallback={<Spinner area='block' />}>
              <TaskSuspendRequest
                title={
                  taskSuspendRequestStatusMap.isNew
                    ? 'Запрошено ожидание'
                    : taskSuspendRequestStatusMap.isApproved
                    ? 'Заявка находится в ожидании'
                    : ''
                }
                date={details.suspendRequest.suspendEndAt}
                user={details.suspendRequest.author}
                comment={details.suspendRequest.comment}
                action={
                  taskSuspendRequestStatusMap.isNew
                    ? {
                        text: 'Отменить запрос',
                        onClick: handleCancelTaskSuspendRequest,
                        loading: cancelSuspendRequestIsLoading,
                      }
                    : taskSuspendRequestStatusMap.isApproved
                    ? { text: 'Вернуть в работу', disabled: true }
                    : undefined
                }
              />
            </React.Suspense>
          )}

          {details && (
            <Space
              data-testid='task-card-details'
              direction='vertical'
              $block
              size='middle'
            >
              <MainDetails
                recordId={details.recordId}
                title={details.title}
                createdAt={formatDate(details.createdAt, DATE_TIME_FORMAT)}
                name={details.name}
                address={details.address}
                contactService={details.contactService}
                contactPhone={details.contactPhone}
                portablePhone={details.portablePhone}
                olaStatus={details.olaStatus}
                olaEstimatedTime={details.olaEstimatedTime}
                olaNextBreachTime={details.olaNextBreachTime}
              />

              <AdditionalInfo
                email={details.email}
                sapId={details.sapId}
                weight={details.weight}
                address={details.address}
                company={details.company}
                contactType={details.contactType}
                severity={taskSeverityMap.get(details.severity)!}
                priority={taskPriorityMap.get(details.priorityCode)!}
                impact={taskImpactMap.get(details.initialImpact)!}
                supportGroup={details.supportGroup?.name}
                productClassifier1={details.productClassifier1}
                productClassifier2={details.productClassifier2}
                productClassifier3={details.productClassifier3}
                latitude={details.latitude}
                longitude={details.longitude}
                expanded={additionalInfoExpanded}
                onExpand={onExpandAdditionalInfo}
              />

              {!additionalInfoExpanded && <DividerStyled />}

              <SecondaryDetails
                id={details.id}
                recordId={details.recordId}
                status={details.status}
                extendedStatus={details.extendedStatus}
                assignee={details.assignee}
                workGroup={details.workGroup}
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
              />

              <TaskCardTabs details={details} />

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
                    type={details.type}
                    recordId={details.recordId}
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
                    recordId={details.recordId}
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
                    recordId={details.recordId}
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
