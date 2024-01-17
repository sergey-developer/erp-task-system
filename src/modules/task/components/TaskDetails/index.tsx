import { useBoolean } from 'ahooks'
import { App, Drawer, FormInstance } from 'antd'
import debounce from 'lodash/debounce'
import noop from 'lodash/noop'
import React, { FC, useCallback, useEffect } from 'react'

import { ExecuteTaskModalProps } from 'modules/task/components/ExecuteTaskModal/types'
import { RequestTaskReclassificationModalProps } from 'modules/task/components/RequestTaskReclassificationModal/types'
import {
  RequestTaskSuspendFormFields,
  RequestTaskSuspendModalProps,
} from 'modules/task/components/RequestTaskSuspendModal/types'
import { getFormErrorsFromBadRequestError } from 'modules/task/components/RequestTaskSuspendModal/utils'
import AdditionalInfo from 'modules/task/components/TaskDetails/AdditionalInfo'
import MainDetails from 'modules/task/components/TaskDetails/MainDetails'
import SecondaryDetails from 'modules/task/components/TaskDetails/SecondaryDetails'
import Tabs from 'modules/task/components/TaskDetails/Tabs'
import Title from 'modules/task/components/TaskDetails/Title'
import { TaskFirstLineFormFields } from 'modules/task/components/TaskFirstLineModal/types'
import { TaskSecondLineFormFields } from 'modules/task/components/TaskSecondLineModal/types'
import {
  getTaskWorkPerformedActMessages,
  TaskDetailsTabsEnum,
  taskImpactMap,
  taskPriorityMap,
  taskSeverityMap,
} from 'modules/task/constants/task'
import {
  useGetTask,
  useResolveTask,
  useTakeTask,
  useTaskExtendedStatus,
  useTaskStatus,
} from 'modules/task/hooks/task'
import { useUpdateTaskAssignee } from 'modules/task/hooks/taskAssignee'
import {
  useCreateTaskReclassificationRequest,
  useGetTaskReclassificationRequest,
} from 'modules/task/hooks/taskReclassificationRequest'
import {
  useCreateTaskSuspendRequest,
  useDeleteTaskSuspendRequest,
  useTaskSuspendRequestStatus,
} from 'modules/task/hooks/taskSuspendRequest'
import { useDeleteTaskWorkGroup, useUpdateTaskWorkGroup } from 'modules/task/hooks/taskWorkGroup'
import {
  CreateTaskSuspendRequestBadRequestErrorResponse,
  TaskAssigneeModel,
} from 'modules/task/models'
import { useGetTaskWorkPerformedActMutation } from 'modules/task/services/taskApi.service'
import { useUserRole } from 'modules/user/hooks'

import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import { MimetypeEnum } from 'shared/constants/mimetype'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse, isNotFoundError } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { EmptyFn } from 'shared/types/utils'
import { base64ToArrayBuffer, clickDownloadLink } from 'shared/utils/common'
import { formatDate, mergeDateTime } from 'shared/utils/date'
import { extractOriginFiles } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'

import { useSystemSettingsState } from '../../../../shared/hooks/system'

const ExecuteTaskModal = React.lazy(() => import('modules/task/components/ExecuteTaskModal'))

const ConfirmExecuteTaskModal = React.lazy(
  () => import('modules/task/components/ConfirmExecuteTaskModal'),
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

export type TaskDetailsProps = {
  taskId: IdType

  additionalInfoExpanded: boolean
  onExpandAdditionalInfo: EmptyFn

  onClose: EmptyFn

  activeTab?: TaskDetailsTabsEnum
}

const TaskDetails: FC<TaskDetailsProps> = ({
  taskId,

  additionalInfoExpanded,
  onExpandAdditionalInfo,

  activeTab,

  onClose: originOnClose,
}) => {
  const { modal } = App.useApp()

  const userRole = useUserRole()
  const closeTask = useDebounceFn(originOnClose)

  const {
    refetch: originRefetchTask,
    currentData: task,
    isFetching: taskIsFetching,
    isError: isGetTaskError,
    startedTimeStamp: getTaskStartedTimeStamp = 0,
  } = useGetTask(taskId)

  const refetchTask = useDebounceFn(originRefetchTask)

  const taskStatus = useTaskStatus(task?.status)
  const taskExtendedStatus = useTaskExtendedStatus(task?.extendedStatus)
  const taskSuspendRequestStatus = useTaskSuspendRequestStatus(task?.suspendRequest?.status)

  const [deleteSuspendRequest, { isLoading: deleteSuspendRequestIsLoading }] =
    useDeleteTaskSuspendRequest()

  const [createSuspendRequest, { isLoading: createSuspendRequestIsLoading }] =
    useCreateTaskSuspendRequest()

  const {
    fn: createReclassificationRequest,
    state: {
      isLoading: createReclassificationRequestIsLoading,
      data: createReclassificationRequestResult,
      reset: resetCreateReclassificationRequestData,
      fulfilledTimeStamp: createReclassificationRequestFulfilledTimeStamp = 0,
    },
  } = useCreateTaskReclassificationRequest()

  const {
    currentData: getReclassificationRequestResult,
    isFetching: reclassificationRequestIsFetching,
  } = useGetTaskReclassificationRequest(
    { taskId },
    {
      skip: !taskExtendedStatus.isInReclassification || !!createReclassificationRequestResult,
    },
  )

  const reclassificationRequest =
    createReclassificationRequestResult || getReclassificationRequestResult

  const getTaskCalledAfterSuccessfullyRequestCreation =
    getTaskStartedTimeStamp > createReclassificationRequestFulfilledTimeStamp

  const {
    fn: takeTask,
    state: { isLoading: takeTaskIsLoading },
  } = useTakeTask()

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

  const handleOpenExecuteTaskModal = useCallback(
    () =>
      debounce(() => {
        if (task) {
          task.hasRelocationTasks ? openExecuteTaskModal() : openConfirmExecuteTaskModal()
        }
      })(),
    [openConfirmExecuteTaskModal, openExecuteTaskModal, task],
  )

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

  const { data: systemSettings, isFetching: systemSettingsIsFetching } = useSystemSettingsState()

  useEffect(() => {
    if (isGetTaskError) originOnClose()
  }, [isGetTaskError, originOnClose])

  const handleExecuteTask = useCallback<ExecuteTaskModalProps['onSubmit']>(
    async (values, setFields) => {
      if (!task) return

      try {
        await resolveTask({
          taskId: task.id,
          techResolution: values.techResolution.trim(),
          userResolution: values.userResolution?.trim(),
          attachments: values.attachments?.length
            ? extractOriginFiles(values.attachments)
            : undefined,
        })

        originOnClose()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            setFields(getFieldsErrors(error.data))

            if (error.data.detail) {
              showErrorNotification(error.data.detail)
            }
          }
        }
      }
    },
    [task, originOnClose, resolveTask],
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
          const blob = base64ToArrayBuffer(file)

          if (blob) {
            clickDownloadLink(blob, MimetypeEnum.Pdf, `Акт о выполненных работах ${task.id}`)
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
      setFields: FormInstance['setFields'],
      closeTaskSecondLineModal: EmptyFn,
    ) => {
      if (!task) return

      try {
        await updateWorkGroup({ taskId: task.id, ...values })
        closeTaskSecondLineModal()
        originOnClose()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            setFields(getFieldsErrors(error.data))
          }
        }
      }
    },
    [task, originOnClose, updateWorkGroup],
  )

  const handleTransferTaskToFirstLine = useCallback(
    async (
      values: TaskFirstLineFormFields,
      setFields: FormInstance['setFields'],
      closeTaskFirstLineModal: EmptyFn,
    ) => {
      if (!task) return

      try {
        await deleteWorkGroup({ taskId: task.id, ...values })
        closeTaskFirstLineModal()
        originOnClose()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            setFields(getFieldsErrors(error.data))
          }
        }
      }
    },
    [originOnClose, deleteWorkGroup, task],
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

  const handleDeleteTaskSuspendRequest = useDebounceFn(async () => {
    if (!task) return
    await deleteSuspendRequest({ taskId: task.id })
  }, [deleteSuspendRequest, task])

  const title = task && (
    <Title
      id={task.id}
      type={task.type}
      assignee={task.assignee}
      workGroup={task.workGroup}
      status={task.status}
      extendedStatus={task.extendedStatus}
      olaStatus={task.olaStatus}
      suspendRequest={task.suspendRequest}
      onReloadTask={refetchTask}
      onExecuteTask={handleOpenExecuteTaskModal}
      onRequestSuspend={debouncedOpenRequestTaskSuspendModal}
      onRequestReclassification={handleOpenTaskReclassificationModal}
    />
  )

  return (
    <>
      <Drawer
        data-testid='task-details'
        open={!!taskId}
        onClose={closeTask}
        width={650}
        title={title}
        mask={false}
      >
        <Space direction='vertical' $block size='middle'>
          <LoadingArea
            data-testid='task-reclassification-request-loading'
            isLoading={reclassificationRequestIsFetching || createReclassificationRequestIsLoading}
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

          <LoadingArea
            data-testid='task-loading'
            isLoading={taskIsFetching}
            tip='Загрузка заявки...'
          >
            <Space direction='vertical' $block size='middle'>
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
                            onClick: handleDeleteTaskSuspendRequest,
                            loading: deleteSuspendRequestIsLoading,
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

                  <SecondaryDetails
                    id={task.id}
                    recordId={task.recordId}
                    status={task.status}
                    extendedStatus={task.extendedStatus}
                    assignee={task.assignee}
                    workGroup={task.workGroup}
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

                  <Tabs task={task} activeTab={activeTab} />
                </Space>
              )}
            </Space>
          </LoadingArea>
        </Space>
      </Drawer>

      {executeTaskModalOpened && task && (
        <React.Suspense fallback={<ModalFallback open onCancel={handleCloseExecuteTaskModal} />}>
          <ExecuteTaskModal
            open={executeTaskModalOpened}
            type={task.type}
            recordId={task.recordId}
            isLoading={isTaskResolving}
            onCancel={handleCloseExecuteTaskModal}
            onSubmit={handleExecuteTask}
            onGetAct={handleGetAct}
            getActIsLoading={taskWorkPerformedActIsLoading}
          />
        </React.Suspense>
      )}

      {confirmExecuteTaskModalOpened && task && (
        <React.Suspense
          fallback={<ModalFallback open onCancel={debouncedCloseConfirmExecuteTaskModal} />}
        >
          <ConfirmExecuteTaskModal
            open={confirmExecuteTaskModalOpened}
            recordId={task.recordId}
            onCancel={debouncedCloseConfirmExecuteTaskModal}
            onConfirm={handleConfirmExecuteTask}
          />
        </React.Suspense>
      )}

      {taskReclassificationModalOpened && task && (
        <React.Suspense fallback={<ModalFallback open onCancel={closeTaskReclassificationModal} />}>
          <RequestTaskReclassificationModal
            open={taskReclassificationModalOpened}
            recordId={task.recordId}
            isLoading={createReclassificationRequestIsLoading}
            onSubmit={handleReclassificationRequestSubmit}
            onCancel={closeTaskReclassificationModal}
          />
        </React.Suspense>
      )}

      {requestTaskSuspendModalOpened && task && (
        <React.Suspense fallback={<ModalFallback open onCancel={closeRequestTaskSuspendModal} />}>
          <RequestTaskSuspendModal
            open={requestTaskSuspendModalOpened}
            recordId={task.recordId}
            systemSettings={systemSettings}
            isLoading={createSuspendRequestIsLoading}
            onSubmit={handleCreateTaskSuspendRequest}
            onCancel={closeRequestTaskSuspendModal}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default TaskDetails
