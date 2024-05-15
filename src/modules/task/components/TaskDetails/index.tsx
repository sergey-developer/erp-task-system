import { useBoolean } from 'ahooks'
import { App, Drawer, FormInstance } from 'antd'
import debounce from 'lodash/debounce'
import React, { FC, useCallback, useEffect, useMemo } from 'react'

import { useCancelReclassificationRequest } from 'modules/reclassificationRequest/hooks'
import { CreateRegistrationFNRequestModalProps } from 'modules/task/components/CreateRegistrationFNRequestModal/types'
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
import TaskDetailsTitle from 'modules/task/components/TaskDetails/TaskDetailsTitle'
import { TaskFirstLineFormFields } from 'modules/task/components/TaskFirstLineModal/types'
import { TaskSecondLineFormFields } from 'modules/task/components/TaskSecondLineModal/types'
import { UpdateTaskDeadlineModalProps } from 'modules/task/components/UpdateTaskDeadlineModal/types'
import { UpdateTaskDescriptionModalProps } from 'modules/task/components/UpdateTaskDescriptionModal/types'
import {
  getTaskWorkPerformedActMessages,
  TaskAttachmentTypeEnum,
  TaskDetailsTabsEnum,
  taskImpactMap,
  taskPriorityMap,
  taskSeverityMap,
} from 'modules/task/constants/task'
import {
  useCreateTaskAttachment,
  useCreateTaskRegistrationFNRequest,
  useGetTask,
  useGetTaskRegistrationRequestRecipientsFN,
  useResolveTask,
  useTakeTask,
  useTaskExtendedStatus,
  useTaskStatus,
  useUpdateTaskDeadline,
  useUpdateTaskDescription,
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
import { useGetUserActions, useUserRole } from 'modules/user/hooks'

import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { useGetFaChangeTypes } from 'shared/hooks/catalogs/faChangeTypes'
import { useSystemSettingsState } from 'shared/hooks/system'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse, isNotFoundError } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { EmptyFn } from 'shared/types/utils'
import { base64ToBytes, isFalse, isTrue } from 'shared/utils/common'
import { formatDate, mergeDateTime } from 'shared/utils/date'
import { downloadFile, extractIdsFromFilesResponse, extractOriginFiles } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'

import { useAuthUser } from '../../../auth/hooks'

const CreateRegistrationFNRequestModal = React.lazy(
  () => import('modules/task/components/CreateRegistrationFNRequestModal'),
)

const ConfirmCancelReclassificationRequestModal = React.lazy(
  () => import('modules/task/components/ConfirmCancelReclassificationRequestModal'),
)

const ExecuteTaskModal = React.lazy(() => import('modules/task/components/ExecuteTaskModal'))

const ConfirmExecuteTaskReclassificationTasksModal = React.lazy(
  () => import('modules/task/components/ConfirmExecuteTaskReclassificationTasksModal'),
)

const ConfirmExecuteTaskRegistrationFNModal = React.lazy(
  () => import('modules/task/components/ConfirmExecuteTaskRegistrationFNModal'),
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

const UpdateTaskDescriptionModal = React.lazy(
  () => import('modules/task/components/UpdateTaskDescriptionModal'),
)

const UpdateTaskDeadlineModal = React.lazy(
  () => import('modules/task/components/UpdateTaskDeadlineModal'),
)

export type TaskDetailsProps = {
  taskId: IdType

  additionalInfoExpanded: boolean
  onExpandAdditionalInfo: EmptyFn

  onClose: EmptyFn

  activeTab?: TaskDetailsTabsEnum
  height?: number
}

const TaskDetails: FC<TaskDetailsProps> = ({
  taskId,

  additionalInfoExpanded,
  onExpandAdditionalInfo,

  activeTab,
  height,

  onClose: originOnClose,
}) => {
  const { modal } = App.useApp()

  const userRole = useUserRole()
  const authUser = useAuthUser()
  const onClose = useDebounceFn(originOnClose)

  const { currentData: userActions, isFetching: userActionsIsFetching } = useGetUserActions(
    { userId: authUser?.id! },
    { skip: !authUser },
  )

  const {
    refetch: originRefetchTask,
    currentData: task,
    isFetching: taskIsFetching,
    isError: isGetTaskError,
    startedTimeStamp: getTaskStartedTimeStamp = 0,
  } = useGetTask(taskId)

  useEffect(() => {
    if (isGetTaskError) originOnClose()
  }, [isGetTaskError, originOnClose])

  const debouncedRefetchTask = useDebounceFn(originRefetchTask)

  const taskStatus = useTaskStatus(task?.status)
  const taskExtendedStatus = useTaskExtendedStatus(task?.extendedStatus)
  const taskSuspendRequestStatus = useTaskSuspendRequestStatus(task?.suspendRequest?.status)

  const [updateTaskDescriptionMutation, { isLoading: updateTaskDescriptionIsLoading }] =
    useUpdateTaskDescription()

  const [updateTaskDeadlineMutation, { isLoading: updateTaskDeadlineIsLoading }] =
    useUpdateTaskDeadline()

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
    { taskId: task?.id! },
    {
      skip:
        !task?.id ||
        !taskExtendedStatus.isInReclassification ||
        !!createReclassificationRequestResult,
    },
  )

  const [cancelReclassificationRequest, { isLoading: cancelReclassificationRequestIsLoading }] =
    useCancelReclassificationRequest()

  const reclassificationRequest =
    createReclassificationRequestResult || getReclassificationRequestResult

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

  // create registration FN request modal
  const [
    createRegistrationFNRequestModalOpened,
    { toggle: toggleCreateRegistrationFNRequestModal },
  ] = useBoolean(false)

  const debouncedToggleCreateRegistrationFNRequestModal = useDebounceFn(
    toggleCreateRegistrationFNRequestModal,
  )
  // create registration FN request modal

  const { data: faChangeTypes = [], isFetching: faChangeTypesIsFetching } = useGetFaChangeTypes(
    undefined,
    { skip: !createRegistrationFNRequestModalOpened },
  )

  const {
    data: taskRegistrationRequestRecipients,
    isFetching: taskRegistrationRequestRecipientsIsFetching,
  } = useGetTaskRegistrationRequestRecipientsFN(
    { taskId: task?.id! },
    { skip: !task?.id || !createRegistrationFNRequestModalOpened },
  )

  const [createTaskAttachment, { isLoading: createTaskAttachmentIsLoading }] =
    useCreateTaskAttachment()

  const [createTaskRegistrationFNRequest, { isLoading: createTaskRegistrationFNRequestIsLoading }] =
    useCreateTaskRegistrationFNRequest()

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

  // execute task modal
  const [
    executeTaskModalOpened,
    { setTrue: openExecuteTaskModal, setFalse: closeExecuteTaskModal },
  ] = useBoolean(false)

  const onCloseExecuteTaskModal = useDebounceFn(closeExecuteTaskModal)
  // execute task modal

  // confirm execute task reclassification tasks modal
  const [
    confirmExecuteTaskReclassificationTasksModalOpened,
    {
      setTrue: openConfirmExecuteTaskReclassificationTasksModal,
      setFalse: closeConfirmExecuteTaskReclassificationTasksModal,
    },
  ] = useBoolean(false)

  const debouncedCloseConfirmExecuteTaskReclassificationTasksModal = useDebounceFn(
    closeConfirmExecuteTaskReclassificationTasksModal,
  )

  const onConfirmExecuteTaskReclassificationTasks = useDebounceFn(() => {
    closeConfirmExecuteTaskReclassificationTasksModal()
    openExecuteTaskModal()
  })
  // confirm execute task reclassification tasks modal

  // confirm execute task registration FN modal
  const [
    confirmExecuteTaskRegistrationFNModalOpened,
    {
      setTrue: openConfirmExecuteTaskRegistrationFNModal,
      setFalse: closeConfirmExecuteTaskRegistrationFNModal,
    },
  ] = useBoolean(false)

  const debouncedCloseConfirmExecuteTaskRegistrationFNModal = useDebounceFn(
    closeConfirmExecuteTaskRegistrationFNModal,
  )

  const onConfirmExecuteTaskRegistrationFN = useDebounceFn(() => {
    closeConfirmExecuteTaskRegistrationFNModal()

    if (task) {
      task.hasRelocationTasks
        ? openExecuteTaskModal()
        : openConfirmExecuteTaskReclassificationTasksModal()
    }
  }, [task])
  // confirm execute task registration FN modal

  // execute task modal
  const onOpenExecuteTaskModal = useCallback(
    () =>
      debounce(() => {
        if (!task) return

        isTrue(task.fiscalAccumulator?.isRequestSent) &&
        isFalse(task.fiscalAccumulator?.isRequestApproved)
          ? openConfirmExecuteTaskRegistrationFNModal()
          : task.hasRelocationTasks
          ? openExecuteTaskModal()
          : openConfirmExecuteTaskReclassificationTasksModal()
      }, DEFAULT_DEBOUNCE_VALUE)(),
    [
      openConfirmExecuteTaskReclassificationTasksModal,
      openConfirmExecuteTaskRegistrationFNModal,
      openExecuteTaskModal,
      task,
    ],
  )
  // execute task modal

  // update description modal
  const [updateDescriptionModalOpened, { toggle: toggleUpdateDescriptionModal }] = useBoolean(false)
  const debouncedToggleUpdateDescriptionModal = useDebounceFn(toggleUpdateDescriptionModal)
  // update description modal

  // update deadline modal
  const [updateDeadlineModalOpened, { toggle: toggleUpdateDeadlineModal }] = useBoolean(false)
  const debouncedToggleUpdateDeadlineModal = useDebounceFn(toggleUpdateDeadlineModal)
  // update deadline modal

  // task reclassification modal
  const [
    taskReclassificationModalOpened,
    { setTrue: openTaskReclassificationModal, setFalse: closeTaskReclassificationModal },
  ] = useBoolean(false)

  const onOpenTaskReclassificationModal = useDebounceFn(() => {
    if (task) {
      task.parentInteractionExternalId
        ? openTaskReclassificationModal()
        : modal.warning({ title: 'Невозможно переклассифицировать заявку без обращения' })
    }
  }, [task?.parentInteractionExternalId])
  // task reclassification modal

  // task suspend modal
  const [
    requestTaskSuspendModalOpened,
    { toggle: toggleRequestTaskSuspendModal, setFalse: closeRequestTaskSuspendModal },
  ] = useBoolean(false)

  const debouncedToggleRequestTaskSuspendModal = useDebounceFn(toggleRequestTaskSuspendModal)
  // task suspend modal

  const { data: systemSettings, isFetching: systemSettingsIsFetching } = useSystemSettingsState()

  const [
    confirmCancelReclassificationRequestModalOpened,
    {
      toggle: toggleConfirmCancelReclassificationRequestModal,
      setFalse: closeConfirmCancelReclassificationRequestModal,
    },
  ] = useBoolean(false)

  const debouncedToggleConfirmCancelReclassificationRequestModal = useDebounceFn(
    toggleConfirmCancelReclassificationRequestModal,
  )

  const onCancelReclassificationRequest = useCallback(async () => {
    if (!reclassificationRequest) return

    try {
      await cancelReclassificationRequest({
        reclassificationRequestId: reclassificationRequest.id,
      }).unwrap()
      originRefetchTask()
      closeConfirmCancelReclassificationRequestModal()
    } catch (error) {
      if (isErrorResponse(error) && isNotFoundError(error)) {
        originRefetchTask()
      }
    }
  }, [
    cancelReclassificationRequest,
    closeConfirmCancelReclassificationRequestModal,
    originRefetchTask,
    reclassificationRequest,
  ])

  const onCreateTaskRegistrationFNRequest = useCallback<
    CreateRegistrationFNRequestModalProps['onSubmit']
  >(
    async (values, setFields) => {
      if (!task) return

      try {
        await createTaskRegistrationFNRequest({
          taskId: task.id,
          changeType: values.changeType,
          attachments: extractIdsFromFilesResponse(values.attachments),
        }).unwrap()

        toggleCreateRegistrationFNRequestModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [createTaskRegistrationFNRequest, task, toggleCreateRegistrationFNRequestModal],
  )

  const onUpdateDescription: UpdateTaskDescriptionModalProps['onSubmit'] = useCallback(
    async (values, setFields) => {
      if (!task) return

      try {
        await updateTaskDescriptionMutation({ taskId: task.id, ...values }).unwrap()
        toggleUpdateDescriptionModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [task, toggleUpdateDescriptionModal, updateTaskDescriptionMutation],
  )

  const onUpdateDeadline: UpdateTaskDeadlineModalProps['onSubmit'] = useCallback(
    async (values, setFields) => {
      if (!task) return

      try {
        await updateTaskDeadlineMutation({
          taskId: task.id,
          internalOlaNextBreachTime:
            values.date && values.time
              ? mergeDateTime(values.date, values.time).toISOString()
              : null,
        }).unwrap()

        toggleUpdateDeadlineModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [task, toggleUpdateDeadlineModal, updateTaskDeadlineMutation],
  )

  const onExecuteTask = useCallback<ExecuteTaskModalProps['onSubmit']>(
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
        }).unwrap()

        originOnClose()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [task, originOnClose, resolveTask],
  )

  const onGetAct = useCallback<ExecuteTaskModalProps['onGetAct']>(
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

  const onReclassificationRequestSubmit = useCallback<
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

  const onTransferTaskToSecondLine = useCallback(
    async (
      values: TaskSecondLineFormFields,
      setFields: FormInstance<TaskSecondLineFormFields>['setFields'],
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

  const onTransferTaskToFirstLine = useCallback(
    async (
      values: TaskFirstLineFormFields,
      setFields: FormInstance<TaskFirstLineFormFields>['setFields'],
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

  const onUpdateAssignee = useCallback(
    async (assignee: TaskAssigneeModel['id']) => {
      if (!task) return

      try {
        await updateAssignee({ taskId: task.id, assignee })
      } catch {}
    },
    [task, updateAssignee],
  )

  const onTakeTask = useCallback(async () => {
    if (!task) return
    await takeTask({ taskId: task.id })
  }, [takeTask, task])

  const onCreateTaskSuspendRequest: RequestTaskSuspendModalProps['onSubmit'] = useCallback(
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

  const onDeleteTaskSuspendRequest = useDebounceFn(async () => {
    if (!task) return
    await deleteSuspendRequest({ taskId: task.id })
  }, [deleteSuspendRequest, task])

  const onCreateTaskAttachment = useCallback<
    CreateRegistrationFNRequestModalProps['onCreateAttachment']
  >(
    async (options) => {
      if (!task) return

      await createTaskAttachment(
        { taskId: task.id, parentType: TaskAttachmentTypeEnum.Journal },
        options,
      )
    },
    [createTaskAttachment, task],
  )

  const title = task && (
    <TaskDetailsTitle
      id={task.id}
      type={task.type}
      assignee={task.assignee}
      workGroup={task.workGroup}
      status={task.status}
      extendedStatus={task.extendedStatus}
      olaStatus={task.olaStatus}
      suspendRequest={task.suspendRequest}
      onReloadTask={debouncedRefetchTask}
      onExecuteTask={onOpenExecuteTaskModal}
      onRegisterFN={debouncedToggleCreateRegistrationFNRequestModal}
      onRequestSuspend={debouncedToggleRequestTaskSuspendModal}
      onRequestReclassification={onOpenTaskReclassificationModal}
      onUpdateDescription={debouncedToggleUpdateDescriptionModal}
      onUpdateDeadline={debouncedToggleUpdateDeadlineModal}
    />
  )

  const createRegistrationFNRequestValues = useMemo<
    CreateRegistrationFNRequestModalProps['values']
  >(
    () => ({
      changeType: faChangeTypes.find((t) => t.isDefault)?.id,
    }),
    [faChangeTypes],
  )

  return (
    <>
      <Drawer
        data-testid='task-details'
        open={!!taskId}
        onClose={onClose}
        width={650}
        styles={height ? { wrapper: { top: 'unset', height } } : undefined}
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
                  onCancel={debouncedToggleConfirmCancelReclassificationRequestModal}
                  cancelBtnDisabled={taskStatus.isAwaiting}
                />
              </React.Suspense>
            )}
          </LoadingArea>

          <LoadingArea
            data-testid='task-loading'
            isLoading={taskIsFetching || userActionsIsFetching}
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
                            onClick: onDeleteTaskSuspendRequest,
                            loading: deleteSuspendRequestIsLoading,
                            disabled: userRole.isEngineerRole,
                          }
                        : taskSuspendRequestStatus.isApproved
                        ? {
                            text: 'Вернуть в работу',
                            onClick: onTakeTask,
                            loading: takeTaskIsLoading,
                          }
                        : undefined
                    }
                  />
                </React.Suspense>
              )}

              {task && userActions && (
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

                  <SecondaryDetails
                    id={task.id}
                    recordId={task.recordId}
                    status={task.status}
                    extendedStatus={task.extendedStatus}
                    assignee={task.assignee}
                    workGroup={task.workGroup}
                    transferTaskToFirstLine={onTransferTaskToFirstLine}
                    transferTaskToFirstLineIsLoading={deleteWorkGroupIsLoading}
                    transferTaskToSecondLine={onTransferTaskToSecondLine}
                    transferTaskToSecondLineIsLoading={updateWorkGroupIsLoading}
                    updateAssignee={onUpdateAssignee}
                    updateAssigneeIsLoading={updateAssigneeIsLoading}
                    takeTask={onTakeTask}
                    takeTaskIsLoading={takeTaskIsLoading}
                    taskSuspendRequestStatus={task.suspendRequest?.status}
                    userActions={userActions}
                  />

                  <Tabs task={task} activeTab={activeTab} />
                </Space>
              )}
            </Space>
          </LoadingArea>
        </Space>
      </Drawer>

      {executeTaskModalOpened && task && (
        <React.Suspense fallback={<ModalFallback open onCancel={onCloseExecuteTaskModal} />}>
          <ExecuteTaskModal
            open={executeTaskModalOpened}
            type={task.type}
            recordId={task.recordId}
            isLoading={taskIsResolving}
            onCancel={onCloseExecuteTaskModal}
            onSubmit={onExecuteTask}
            onGetAct={onGetAct}
            getActIsLoading={taskWorkPerformedActIsLoading}
          />
        </React.Suspense>
      )}

      {confirmExecuteTaskReclassificationTasksModalOpened && task && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={debouncedCloseConfirmExecuteTaskReclassificationTasksModal}
            />
          }
        >
          <ConfirmExecuteTaskReclassificationTasksModal
            open={confirmExecuteTaskReclassificationTasksModalOpened}
            recordId={task.recordId}
            onCancel={debouncedCloseConfirmExecuteTaskReclassificationTasksModal}
            onOk={onConfirmExecuteTaskReclassificationTasks}
          />
        </React.Suspense>
      )}

      {confirmExecuteTaskRegistrationFNModalOpened && task && (
        <React.Suspense
          fallback={
            <ModalFallback open onCancel={debouncedCloseConfirmExecuteTaskRegistrationFNModal} />
          }
        >
          <ConfirmExecuteTaskRegistrationFNModal
            open={confirmExecuteTaskRegistrationFNModalOpened}
            onCancel={debouncedCloseConfirmExecuteTaskRegistrationFNModal}
            onOk={onConfirmExecuteTaskRegistrationFN}
          />
        </React.Suspense>
      )}

      {taskReclassificationModalOpened && task && (
        <React.Suspense fallback={<ModalFallback open onCancel={closeTaskReclassificationModal} />}>
          <RequestTaskReclassificationModal
            open={taskReclassificationModalOpened}
            recordId={task.recordId}
            isLoading={createReclassificationRequestIsLoading}
            onSubmit={onReclassificationRequestSubmit}
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
            systemSettingsIsLoading={systemSettingsIsFetching}
            isLoading={createSuspendRequestIsLoading}
            onSubmit={onCreateTaskSuspendRequest}
            onCancel={closeRequestTaskSuspendModal}
          />
        </React.Suspense>
      )}

      {confirmCancelReclassificationRequestModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={debouncedToggleConfirmCancelReclassificationRequestModal}
            />
          }
        >
          <ConfirmCancelReclassificationRequestModal
            open={confirmCancelReclassificationRequestModalOpened}
            onOk={onCancelReclassificationRequest}
            onCancel={debouncedToggleConfirmCancelReclassificationRequestModal}
            confirmLoading={cancelReclassificationRequestIsLoading}
          />
        </React.Suspense>
      )}

      {updateDescriptionModalOpened && task && (
        <React.Suspense
          fallback={<ModalFallback open onCancel={debouncedToggleUpdateDescriptionModal} />}
        >
          <UpdateTaskDescriptionModal
            open={updateDescriptionModalOpened}
            onSubmit={onUpdateDescription}
            onCancel={debouncedToggleUpdateDescriptionModal}
            confirmLoading={updateTaskDescriptionIsLoading}
            description={task.description}
            previousDescription={task.previousDescription}
          />
        </React.Suspense>
      )}

      {updateDeadlineModalOpened && task && (
        <React.Suspense
          fallback={<ModalFallback open onCancel={debouncedToggleUpdateDeadlineModal} />}
        >
          <UpdateTaskDeadlineModal
            open={updateDeadlineModalOpened}
            onSubmit={onUpdateDeadline}
            onCancel={debouncedToggleUpdateDeadlineModal}
            confirmLoading={updateTaskDeadlineIsLoading}
            olaNextBreachTime={task.olaNextBreachTime}
            previousOlaNextBreachTime={task.previousOlaNextBreachTime}
          />
        </React.Suspense>
      )}

      {createRegistrationFNRequestModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback open onCancel={debouncedToggleCreateRegistrationFNRequestModal} />
          }
        >
          <CreateRegistrationFNRequestModal
            open={createRegistrationFNRequestModalOpened}
            onSubmit={onCreateTaskRegistrationFNRequest}
            onCancel={debouncedToggleCreateRegistrationFNRequestModal}
            values={createRegistrationFNRequestValues}
            onCreateAttachment={onCreateTaskAttachment}
            createAttachmentIsLoading={createTaskAttachmentIsLoading}
            confirmLoading={createTaskRegistrationFNRequestIsLoading}
            changeTypes={faChangeTypes}
            changeTypesIsLoading={faChangeTypesIsFetching}
            email={taskRegistrationRequestRecipients?.email || []}
            emailAsCopy={taskRegistrationRequestRecipients?.emailAsCopy || []}
            recipientsIsLoading={taskRegistrationRequestRecipientsIsFetching}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default TaskDetails
