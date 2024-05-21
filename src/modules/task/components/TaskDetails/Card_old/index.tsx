import { useBoolean } from 'ahooks'
import { App, FormInstance } from 'antd'
import noop from 'lodash/noop'
import React, { FC, useCallback, useEffect } from 'react'

import { CustomMutationTrigger } from 'lib/rtk-query/types'

import { ExecuteTaskModalProps } from 'modules/task/components/ExecuteTaskModal/types'
import { RequestTaskReclassificationModalProps } from 'modules/task/components/RequestTaskReclassificationModal/types'
import {
  RequestTaskSuspendFormFields,
  RequestTaskSuspendModalProps,
} from 'modules/task/components/RequestTaskSuspendModal/types'
import { getFormErrorsFromBadRequestError } from 'modules/task/components/RequestTaskSuspendModal/utils'
import AdditionalInfo from 'modules/task/components/TaskDetails/AdditionalInfo'
import MainDetails from 'modules/task/components/TaskDetails/MainDetails'
import Tabs from 'modules/task/components/TaskDetails/Tabs'
import Title from 'modules/task/components/TaskDetails/TaskDetailsTitle'
import { TaskFirstLineFormFields } from 'modules/task/components/TaskFirstLineModal/types'
import { TaskSecondLineFormFields } from 'modules/task/components/TaskSecondLineModal/types'
import {
  getTaskWorkPerformedActMessages,
  TaskDetailsTabsEnum,
  taskImpactMap,
  taskPriorityMap,
  taskSeverityMap,
} from 'modules/task/constants/task'
import { useTaskStatus } from 'modules/task/hooks/task'
import { useTaskSuspendRequestStatus } from 'modules/task/hooks/taskSuspendRequest'
import {
  CreateTaskReclassificationRequestMutationArgs,
  CreateTaskSuspendRequestBadRequestErrorResponse,
  CreateTaskSuspendRequestMutationArgs,
  DeleteTaskSuspendRequestMutationArgs,
  GetTaskWorkPerformedActMutationArgs,
  GetTaskWorkPerformedActSuccessResponse,
  TaskAssigneeModel,
  TaskModel,
  TaskReclassificationRequestModel,
} from 'modules/task/models'
import { useUserRole } from 'modules/user/hooks'

import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import { MimetypeEnum } from 'shared/constants/mimetype'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse, isNotFoundError } from 'shared/services/baseApi'
import { AnyFn, EmptyFn, MaybeNull } from 'shared/types/utils'
import { base64ToBytes } from 'shared/utils/common'
import { formatDate, mergeDateTime } from 'shared/utils/date'
import { downloadFile, extractOriginFiles } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'

import { CardStyled, DividerStyled, RootWrapperStyled } from './styles'

const ExecuteTaskModal = React.lazy(() => import('modules/task/components/ExecuteTaskModal'))

const ConfirmExecuteTaskModal = React.lazy(
  () => import('modules/task/components/ConfirmExecuteTaskReclassificationTasksModal'),
)

const TaskSuspendRequest = React.lazy(() => import('modules/task/components/TaskSuspendRequest'))

const RequestTaskReclassificationModal = React.lazy(
  () => import('modules/task/components/RequestTaskReclassificationModal'),
)

const TaskReclassificationRequest = React.lazy(
  () => import('modules/task/components/TaskReclassificationRequest'),
)

const RequestTaskSuspendModal = React.lazy(
  () => import('modules/task/components/RequestTaskSuspendModal'),
)

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
      | 'resolution'
      | 'responseTime'
      | 'attachments'
      | 'parentInteractionExternalId'
      | 'hasRelocationTasks'
      | 'shop'
      | 'isDescriptionChanged'
      | 'previousDescription'
      | 'previousOlaNextBreachTime'
      | 'isOlaNextBreachTimeChanged'
    >
  >

  taskIsLoading: boolean
  refetchTask: EmptyFn
  reclassificationRequest: MaybeNull<TaskReclassificationRequestModel>
  reclassificationRequestIsLoading: boolean
  createReclassificationRequest: (
    data: CreateTaskReclassificationRequestMutationArgs,
  ) => Promise<void>
  createReclassificationRequestIsLoading: boolean

  createSuspendRequest: CustomMutationTrigger<CreateTaskSuspendRequestMutationArgs, any>
  createSuspendRequestIsLoading: boolean
  cancelSuspendRequest: CustomMutationTrigger<DeleteTaskSuspendRequestMutationArgs, any>
  cancelSuspendRequestIsLoading: boolean

  takeTask: AnyFn
  takeTaskIsLoading: boolean

  resolveTask: any
  taskIsResolving: boolean

  getTaskWorkPerformedAct: CustomMutationTrigger<
    GetTaskWorkPerformedActMutationArgs,
    GetTaskWorkPerformedActSuccessResponse
  >
  taskWorkPerformedActIsLoading: boolean

  updateAssignee: AnyFn
  updateAssigneeIsLoading: boolean

  updateWorkGroup: AnyFn
  updateWorkGroupIsLoading: boolean
  deleteWorkGroup: AnyFn
  deleteWorkGroupIsLoading: boolean

  additionalInfoExpanded: boolean
  onExpandAdditionalInfo: EmptyFn

  activeTab?: TaskDetailsTabsEnum

  closeTaskCard: EmptyFn

  isGetTaskError: boolean
}

const TaskCard: FC<TaskCardProps> = ({
  task,
  taskIsLoading,
  refetchTask,
  takeTask,
  takeTaskIsLoading,
  resolveTask,
  taskIsResolving,

  getTaskWorkPerformedAct,
  taskWorkPerformedActIsLoading,

  reclassificationRequest,
  reclassificationRequestIsLoading,
  createReclassificationRequest,
  createReclassificationRequestIsLoading,

  createSuspendRequest,
  createSuspendRequestIsLoading,
  cancelSuspendRequest,
  cancelSuspendRequestIsLoading,

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

  activeTab,
}) => {
  const { modal } = App.useApp()
  const taskStatus = useTaskStatus(task?.status)
  const taskSuspendRequestStatus = useTaskSuspendRequestStatus(task?.suspendRequest?.status)

  const userRole = useUserRole()

  const debouncedRefetchTask = useDebounceFn(refetchTask)

  const [
    executeTaskModalOpened,
    { setTrue: openExecuteTaskModal, setFalse: closeExecuteTaskModal },
  ] = useBoolean(false)

  const handleCloseExecuteTaskModal = useDebounceFn(closeExecuteTaskModal)

  const [
    confirmExecuteTaskModalOpened,
    { setTrue: openConfirmExecuteTaskModal, setFalse: closeConfirmExecuteTaskModal },
  ] = useBoolean(false)

  const debouncedCloseConfirmExecuteTaskModal = useDebounceFn(closeConfirmExecuteTaskModal)

  const handleOpenExecuteTaskModal = useDebounceFn(() => {
    if (task) {
      task.hasRelocationTasks ? openExecuteTaskModal() : openConfirmExecuteTaskModal()
    }
  })

  const handleConfirmExecuteTask = useDebounceFn(() => {
    closeConfirmExecuteTaskModal()
    openExecuteTaskModal()
  })

  const [
    taskReclassificationModalOpened,
    { setTrue: openTaskReclassificationModal, setFalse: closeTaskReclassificationModal },
  ] = useBoolean(false)

  const handleOpenTaskReclassificationModal = useDebounceFn(() => {
    if (task) {
      task.parentInteractionExternalId
        ? openTaskReclassificationModal()
        : modal.warning({ title: 'Невозможно переклассифицировать заявку без обращения' })
    }
  }, [task?.parentInteractionExternalId])

  const [
    requestTaskSuspendModalOpened,
    { setTrue: openRequestTaskSuspendModal, setFalse: closeRequestTaskSuspendModal },
  ] = useBoolean(false)

  const debouncedOpenRequestTaskSuspendModal = useDebounceFn(openRequestTaskSuspendModal)

  useEffect(() => {
    if (isGetTaskError) closeTaskCard()
  }, [isGetTaskError, closeTaskCard])

  const handleExecuteTask = useCallback<ExecuteTaskModalProps['onSubmit']>(
    async (values, setFields) => {
      if (!task) return

      try {
        await resolveTask({
          taskId: task.id,
          ...values,
          techResolution: values.techResolution.trim(),
          userResolution: values.userResolution?.trim(),
          attachments: values.attachments?.length
            ? extractOriginFiles(values.attachments)
            : undefined,
        })

        closeTaskCard()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            setFields(getFieldsErrors(error.data))
          }
        }
      }
    },
    [task, closeTaskCard, resolveTask],
  )

  const handleGetAct = useCallback<ExecuteTaskModalProps['onGetAct']>(
    async (values) => {
      if (!task) return

      try {
        const file = await getTaskWorkPerformedAct({
          taskId: task.id,
          techResolution: values.techResolution,
        }).unwrap()

        if (file) {
          const blob = base64ToBytes(file)

          if (blob) {
            downloadFile(blob, MimetypeEnum.Pdf, `Акт о выполненных работах ${task.id}`)
          }
        }
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isNotFoundError(error) && error.data.detail) {
            showErrorNotification(error.data.detail)
          } else {
            showErrorNotification(getTaskWorkPerformedActMessages.commonError)
          }
        }
      }
    },
    [getTaskWorkPerformedAct, task],
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
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            setFields(getFieldsErrors(error.data))
          }
        }
      }
    },
    [closeTaskReclassificationModal, createReclassificationRequest, task],
  )

  const handleTransferTaskToSecondLine = useCallback(
    async (
      values: TaskSecondLineFormFields,
      setFields: FormInstance<TaskSecondLineFormFields>['setFields'],
      closeTaskSecondLineModal: EmptyFn,
    ) => {
      if (!task) return

      try {
        await updateWorkGroup({ taskId: task.id, ...values })
        closeTaskSecondLineModal()
        closeTaskCard()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            setFields(getFieldsErrors(error.data))
          }
        }
      }
    },
    [task, closeTaskCard, updateWorkGroup],
  )

  const handleTransferTaskToFirstLine = useCallback(
    async (
      values: TaskFirstLineFormFields,
      setFields: FormInstance<TaskFirstLineFormFields>['setFields'],
      closeTaskFirstLineModal: EmptyFn,
    ) => {
      if (!task) return

      try {
        await deleteWorkGroup({ taskId: task.id, ...values })
        closeTaskFirstLineModal()
        closeTaskCard()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            setFields(getFieldsErrors(error.data))
          }
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

  const handleCreateTaskSuspendRequest: RequestTaskSuspendModalProps['onSubmit'] = useCallback(
    async (values: RequestTaskSuspendFormFields, setFields) => {
      if (!task) return

      try {
        await createSuspendRequest({
          taskId: task.id,
          suspendReason: values.reason,
          suspendEndAt: mergeDateTime(values.endDate, values.endTime).toISOString(),
          externalRevisionLink: values.taskLink,
          externalResponsibleCompany: values.organization,
          comment: values.comment,
        }).unwrap()

        closeRequestTaskSuspendModal()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            setFields(
              getFieldsErrors(
                getFormErrorsFromBadRequestError(
                  error.data as CreateTaskSuspendRequestBadRequestErrorResponse,
                ),
              ),
            )
          }
        }
      }
    },
    [closeRequestTaskSuspendModal, createSuspendRequest, task],
  )

  const handleCancelTaskSuspendRequest = useDebounceFn(async () => {
    if (!task) return
    await cancelSuspendRequest({ taskId: task.id })
  }, [cancelSuspendRequest, task])

  const cardTitle = !taskIsLoading && task && (
    // @ts-ignore
    <Title
      id={task.id}
      type={task.type}
      status={task.status}
      workGroup={task.workGroup}
      extendedStatus={task.extendedStatus}
      olaStatus={task.olaStatus}
      assignee={task.assignee}
      suspendRequest={task.suspendRequest}
      onReloadTask={debouncedRefetchTask}
      onExecuteTask={handleOpenExecuteTaskModal}
      onRegisterFN={() => {}}
      onRequestSuspend={debouncedOpenRequestTaskSuspendModal}
      onRequestReclassification={handleOpenTaskReclassificationModal}
      onUpdateDescription={() => {}}
      onUpdateDeadline={() => {}}
    />
  )

  // @ts-ignore
  return (
    <RootWrapperStyled>
      <CardStyled data-testid='task-card' title={cardTitle} loading={taskIsLoading}>
        <Space direction='vertical' $block size='middle'>
          {
            <LoadingArea
              data-testid='task-reclassification-request-loading'
              isLoading={reclassificationRequestIsLoading || createReclassificationRequestIsLoading}
              tip='Загрузка запроса на переклассификацию...'
              area='block'
            >
              {reclassificationRequest && (
                <React.Suspense fallback={<Spinner area='block' />}>
                  <TaskReclassificationRequest
                    comment={reclassificationRequest.comment}
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
                  taskSuspendRequestStatus.isNew || taskSuspendRequestStatus.isInProgress
                    ? 'Запрошено ожидание'
                    : taskSuspendRequestStatus.isApproved
                    ? 'Заявка в ожидании'
                    : ''
                }
                date={task.suspendRequest.suspendEndAt}
                user={task.suspendRequest.author}
                comment={task.suspendRequest.comment}
                action={
                  taskSuspendRequestStatus.isNew || taskSuspendRequestStatus.isInProgress
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
            <Space data-testid='task' direction='vertical' $block size='middle'>
              <MainDetails
                recordId={task.recordId}
                status={task.status}
                title={task.title}
                createdAt={formatDate(task.createdAt)}
                name={task.name}
                address={task.address}
                contactService={task.contactService}
                contactPhone={task.contactPhone}
                portablePhone={task.portablePhone}
                olaStatus={task.olaStatus}
                olaEstimatedTime={task.olaEstimatedTime}
                olaNextBreachTime={task.olaNextBreachTime}
                previousOlaNextBreachTime={task.previousOlaNextBreachTime}
                isOlaNextBreachTimeChanged={task.isOlaNextBreachTimeChanged}
                responseTime={task.responseTime}
                workGroup={task.workGroup}
                assignee={task.assignee}
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

              {/* @ts-ignore */}
              <Tabs task={task} activeTab={activeTab} />

              {executeTaskModalOpened && (
                <React.Suspense
                  fallback={
                    <ModalFallback
                      open={executeTaskModalOpened}
                      onCancel={handleCloseExecuteTaskModal}
                    />
                  }
                >
                  <ExecuteTaskModal
                    open={executeTaskModalOpened}
                    type={task.type}
                    recordId={task.recordId}
                    isLoading={taskIsResolving}
                    onCancel={handleCloseExecuteTaskModal}
                    onSubmit={handleExecuteTask}
                    onGetAct={handleGetAct}
                    getActIsLoading={taskWorkPerformedActIsLoading}
                  />
                </React.Suspense>
              )}

              {confirmExecuteTaskModalOpened && (
                <React.Suspense
                  fallback={
                    <ModalFallback
                      open={confirmExecuteTaskModalOpened}
                      onCancel={debouncedCloseConfirmExecuteTaskModal}
                    />
                  }
                >
                  <ConfirmExecuteTaskModal
                    open={confirmExecuteTaskModalOpened}
                    recordId={task.recordId}
                    onCancel={debouncedCloseConfirmExecuteTaskModal}
                    onOk={handleConfirmExecuteTask}
                  />
                </React.Suspense>
              )}

              {taskReclassificationModalOpened && (
                <React.Suspense
                  fallback={
                    <ModalFallback
                      open={taskReclassificationModalOpened}
                      onCancel={closeTaskReclassificationModal}
                    />
                  }
                >
                  <RequestTaskReclassificationModal
                    open={taskReclassificationModalOpened}
                    recordId={task.recordId}
                    isLoading={createReclassificationRequestIsLoading}
                    onSubmit={handleReclassificationRequestSubmit}
                    onCancel={closeTaskReclassificationModal}
                  />
                </React.Suspense>
              )}

              {requestTaskSuspendModalOpened && (
                <React.Suspense
                  fallback={
                    <ModalFallback
                      open={requestTaskSuspendModalOpened}
                      onCancel={closeRequestTaskSuspendModal}
                    />
                  }
                >
                  <RequestTaskSuspendModal
                    open={requestTaskSuspendModalOpened}
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
