import { useBoolean } from 'ahooks'
import { App, Button, Col, Divider, Drawer, Flex, FormInstance, Row, Typography } from 'antd'
import { useAuthUser } from 'features/auth/hooks'
import { useUpdateInfrastructure } from 'features/infrastructures/hooks'
import { getChangeInfrastructurePageLocationState } from 'features/infrastructures/pages/ChangeInfrastructurePage/utils'
import { makeChangeInfrastructureRoute } from 'features/infrastructures/routes/helpers'
import {
  CreateInternalTaskFormFields,
  CreateInternalTaskModalProps,
} from 'features/task/components/CreateInternalTaskModal/types'
import { CreateRegistrationFNRequestModalProps } from 'features/task/components/CreateRegistrationFNRequestModal/types'
import { firstLineOptionValue } from 'features/task/components/CreateTaskModal'
import { ExecuteTaskModalProps } from 'features/task/components/ExecuteTaskModal/types'
import { RequestTaskReclassificationModalProps } from 'features/task/components/RequestTaskReclassificationModal/types'
import {
  RequestTaskSuspendFormFields,
  RequestTaskSuspendModalProps,
} from 'features/task/components/RequestTaskSuspendModal/types'
import { getFormErrorsFromBadRequestError } from 'features/task/components/RequestTaskSuspendModal/utils'
import AdditionalInfo from 'features/task/components/TaskDetails/AdditionalInfo'
import MainDetails from 'features/task/components/TaskDetails/MainDetails'
import Tabs from 'features/task/components/TaskDetails/Tabs'
import TaskDetailsTitle from 'features/task/components/TaskDetails/TaskDetailsTitle'
import { TaskFirstLineFormFields } from 'features/task/components/TaskFirstLineModal/types'
import { TaskSecondLineFormFields } from 'features/task/components/TaskSecondLineModal/types'
import { UpdateTaskDeadlineModalProps } from 'features/task/components/UpdateTaskDeadlineModal/types'
import { UpdateTaskDescriptionModalProps } from 'features/task/components/UpdateTaskDescriptionModal/types'
import {
  getTaskWorkPerformedActMessages,
  TaskAttachmentTypeEnum,
  TaskDetailsTabsEnum,
  taskImpactMap,
  taskPriorityMap,
  taskSeverityMap,
} from 'features/task/constants/task'
import {
  useClassifyTaskWorkType,
  useCreateTask,
  useCreateTaskAttachment,
  useCreateTaskRegistrationFNRequest,
  useGetTask,
  useGetTaskRegistrationRequestRecipientsFN,
  useResolveTask,
  useTakeTask,
  useTaskExtendedStatus,
  useUpdateTaskDeadline,
  useUpdateTaskDescription,
} from 'features/task/hooks/task'
import { useUpdateTaskAssignee } from 'features/task/hooks/taskAssignee'
import {
  useCreateTaskReclassificationRequest,
  useGetTaskReclassificationRequest,
} from 'features/task/hooks/taskReclassificationRequest'
import {
  useCreateTaskSuspendRequest,
  useDeleteTaskSuspendRequest,
  useTaskSuspendRequestStatus,
} from 'features/task/hooks/taskSuspendRequest'
import { useDeleteTaskWorkGroup, useUpdateTaskWorkGroup } from 'features/task/hooks/taskWorkGroup'
import {
  CreateTaskSuspendRequestBadRequestErrorResponse,
  TaskAssigneeModel,
} from 'features/task/models'
import { useGetTaskWorkPerformedActMutation } from 'features/task/services/taskApi.service'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { useGetUserActions, useGetUsers, useUserPermissions } from 'features/users/hooks'
import { WorkTypeActionsEnum } from 'features/warehouse/constants/workType/enum'
import { useGetWorkTypes } from 'features/warehouse/hooks/workType'
import debounce from 'lodash/debounce'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Label from 'components/Label'
import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
} from 'shared/api/baseApi'
import { useGetFaChangeTypesCatalog } from 'shared/catalogs/hooks/faChangeTypes'
import { useGetResolutionClassificationsCatalog } from 'shared/catalogs/hooks/resolutionClassifications'
import { useGetWorkGroupsCatalog } from 'shared/catalogs/hooks/workGroups'
import { DEFAULT_DEBOUNCE_VALUE, NO_ASSIGNEE_TEXT } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { useCancelReclassificationRequest } from 'shared/reclassificationRequests/hooks'
import { useSystemSettingsState } from 'shared/system/hooks/systemInfo'
import { IdType } from 'shared/types/common'
import { EmptyFn } from 'shared/types/utils'
import { base64ToBytes, isFalse, isTrue, valueOr } from 'shared/utils/common'
import { formatDate, mergeDateTime } from 'shared/utils/date'
import { downloadFile, extractIdsFromFilesResponse, extractOriginFiles } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'

import TaskAssignee from '../TaskAssignee'
import AssigneeBlock from './AssigneeBlock'
import WorkGroupBlock from './WorkGroupBlock'

const CreateRegistrationFNRequestModal = React.lazy(
  () => import('features/task/components/CreateRegistrationFNRequestModal'),
)

const ConfirmCancelReclassificationRequestModal = React.lazy(
  () => import('features/task/components/ConfirmCancelReclassificationRequestModal'),
)

const ExecuteTaskModal = React.lazy(() => import('features/task/components/ExecuteTaskModal'))

const ConfirmExecuteTaskReclassificationTasksModal = React.lazy(
  () => import('features/task/components/ConfirmExecuteTaskReclassificationTasksModal'),
)

const ConfirmExecuteTaskRegistrationFNModal = React.lazy(
  () => import('features/task/components/ConfirmExecuteTaskRegistrationFNModal'),
)

const TaskSuspendRequest = React.lazy(() => import('features/task/components/TaskSuspendRequest'))

const RequestTaskReclassificationModal = React.lazy(
  () => import('features/task/components/RequestTaskReclassificationModal'),
)

const TaskReclassificationRequest = React.lazy(
  () => import('features/task/components/TaskReclassificationRequest'),
)

const RequestTaskSuspendModal = React.lazy(
  () => import('features/task/components/RequestTaskSuspendModal'),
)

const UpdateTaskDescriptionModal = React.lazy(
  () => import('features/task/components/UpdateTaskDescriptionModal'),
)

const UpdateTaskDeadlineModal = React.lazy(
  () => import('features/task/components/UpdateTaskDeadlineModal'),
)

const CreateInternalTaskModal = React.lazy(
  () => import('features/task/components/CreateInternalTaskModal'),
)

const { Text } = Typography

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
  const navigate = useNavigate()

  const [currentTaskId, setCurrentTaskId] = useState<IdType>(taskId)

  useEffect(() => {
    setCurrentTaskId(taskId)
  }, [taskId])

  const [parentTaskAdditionalInfoExpanded, { toggle: toggleParentTaskAdditionalInfoExpanded }] =
    useBoolean(false)

  const [parentTaskOpened, { setTrue: openParentTask, setFalse: closeParentTask }] =
    useBoolean(false)

  const debouncedOpenParentTask = useDebounceFn(openParentTask)
  const debouncedCloseParentTask = useDebounceFn(closeParentTask)

  const authUser = useAuthUser()

  const permissions = useUserPermissions([
    UserPermissionsEnum.ClassificationOfWorkTypes,
    UserPermissionsEnum.InfrastructureProjectRead,
    UserPermissionsEnum.AnyStatusInfrastructureProjectRead,
    UserPermissionsEnum.InfrastructureProjectLeading,
  ])

  const debouncedOnClose = useDebounceFn(originOnClose)

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
  } = useGetTask(currentTaskId)

  useEffect(() => {
    if (isGetTaskError) originOnClose()
  }, [isGetTaskError, originOnClose])

  // create internal task
  const [selectedTaskWorkGroup, setSelectedTaskWorkGroup] =
    useState<CreateInternalTaskFormFields['workGroup']>()

  const [
    createInternalTaskModalOpened,
    { setTrue: openCreateInternalTaskModal, setFalse: closeCreateInternalTaskModal },
  ] = useBoolean(false)

  const debouncedOpenCreateInternalTaskModal = useDebounceFn(openCreateInternalTaskModal)

  const onCloseCreateInternalTaskModal = useCallback(() => {
    closeCreateInternalTaskModal()
    setSelectedTaskWorkGroup(undefined)
  }, [closeCreateInternalTaskModal])

  const debouncedOnCloseCreateInternalTaskModal = useDebounceFn(onCloseCreateInternalTaskModal, [
    onCloseCreateInternalTaskModal,
  ])

  const { currentData: workGroupsCatalog = [], isFetching: workGroupsCatalogIsFetching } =
    useGetWorkGroupsCatalog(undefined, { skip: !createInternalTaskModalOpened })

  const { currentData: observers = [], isFetching: observersIsFetching } = useGetUsers(
    {
      readTasksWorkGroup:
        selectedTaskWorkGroup === firstLineOptionValue ? 'None' : selectedTaskWorkGroup!,
    },
    { skip: !(createInternalTaskModalOpened && selectedTaskWorkGroup) },
  )

  const { currentData: executors = [], isFetching: executorsIsFetching } = useGetUsers(
    {
      resolveTasksWorkGroup:
        selectedTaskWorkGroup === firstLineOptionValue ? 'None' : selectedTaskWorkGroup!,
    },
    { skip: !(createInternalTaskModalOpened && selectedTaskWorkGroup) },
  )

  const { currentData: users = [], isFetching: usersIsFetching } = useGetUsers(undefined, {
    skip: !createInternalTaskModalOpened,
  })

  const [createInternalTaskMutation, { isLoading: createInternalTaskIsLoading }] = useCreateTask()

  const onCreateInternalTask = useCallback<CreateInternalTaskModalProps['onSubmit']>(
    async ({ attachments, olaNextBreachDate, olaNextBreachTime, workGroup, ...values }, form) => {
      try {
        const newTask = await createInternalTaskMutation({
          ...values,
          parentTask: currentTaskId,
          workGroup: workGroup === firstLineOptionValue ? undefined : workGroup,
          olaNextBreachTime: mergeDateTime(olaNextBreachDate, olaNextBreachTime).toISOString(),
          attachments: attachments?.length ? extractOriginFiles(attachments) : undefined,
        }).unwrap()

        setCurrentTaskId(newTask.id)
        onCloseCreateInternalTaskModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          form.setFields(getFieldsErrors(error.data))
        }
      }
    },
    [createInternalTaskMutation, currentTaskId, onCloseCreateInternalTaskModal],
  )
  // create internal task

  const debouncedRefetchTask = useDebounceFn(originRefetchTask)

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

  const [
    createReclassificationRequest,
    {
      isLoading: createReclassificationRequestIsLoading,
      data: createReclassificationRequestResult,
      reset: resetCreateReclassificationRequestData,
      fulfilledTimeStamp: createReclassificationRequestFulfilledTimeStamp = 0,
    },
  ] = useCreateTaskReclassificationRequest()

  const canGetTaskReclassificationRequest =
    taskExtendedStatus.isInReclassification && !createReclassificationRequestResult

  const {
    currentData: getReclassificationRequestResult,
    isFetching: reclassificationRequestIsFetching,
  } = useGetTaskReclassificationRequest(
    { taskId: currentTaskId },
    { skip: !canGetTaskReclassificationRequest },
  )

  const [cancelReclassificationRequest, { isLoading: cancelReclassificationRequestIsLoading }] =
    useCancelReclassificationRequest()

  const reclassificationRequest =
    createReclassificationRequestResult || getReclassificationRequestResult

  const getTaskCalledAfterSuccessfullyRequestCreation =
    getTaskStartedTimeStamp > createReclassificationRequestFulfilledTimeStamp

  const [
    updateInfrastructureMutation,
    { isLoading: updateInfrastructureIsLoading, data: updateInfrastructureResult },
  ] = useUpdateInfrastructure()

  const [takeTask, { isLoading: takeTaskIsLoading }] = useTakeTask()
  const [resolveTask, { isLoading: taskIsResolving }] = useResolveTask()
  const [updateWorkGroup, { isLoading: updateWorkGroupIsLoading }] = useUpdateTaskWorkGroup()
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

  const { data: faChangeTypes = [], isFetching: faChangeTypesIsFetching } =
    useGetFaChangeTypesCatalog(undefined, { skip: !createRegistrationFNRequestModalOpened })

  const {
    data: taskRegistrationRequestRecipients,
    isFetching: taskRegistrationRequestRecipientsIsFetching,
  } = useGetTaskRegistrationRequestRecipientsFN(
    { taskId: currentTaskId },
    { skip: !createRegistrationFNRequestModalOpened },
  )

  const [workTypeIsEditable, { toggle: toggleWorkTypeEditable }] = useBoolean(false)

  const { currentData: workTypes = [], isFetching: workTypesIsFetching } = useGetWorkTypes(
    { taskType: task?.type! },
    { skip: !((workTypeIsEditable || createInternalTaskModalOpened) && !!task?.type) },
  )

  const [classifyTaskWorkTypeMutation, { isLoading: classifyTaskWorkTypeIsLoading }] =
    useClassifyTaskWorkType()

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

  const {
    currentData: resolutionClassifications = [],
    isFetching: resolutionClassificationsIsFetching,
  } = useGetResolutionClassificationsCatalog(
    { supportGroup: task?.supportGroup?.id! },
    {
      skip:
        !task?.supportGroup?.id ||
        !task?.supportGroup?.hasResolutionClassifiers ||
        !executeTaskModalOpened,
    },
  )

  // cancel reclassification request
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
  // cancel reclassification request

  const onCreateTaskRegistrationFNRequest = useCallback<
    CreateRegistrationFNRequestModalProps['onSubmit']
  >(
    async (values, setFields) => {
      try {
        await createTaskRegistrationFNRequest({
          taskId: currentTaskId,
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
    [createTaskRegistrationFNRequest, currentTaskId, toggleCreateRegistrationFNRequestModal],
  )

  const onUpdateDescription: UpdateTaskDescriptionModalProps['onSubmit'] = useCallback(
    async (values, setFields) => {
      try {
        await updateTaskDescriptionMutation({ taskId: currentTaskId, ...values }).unwrap()
        toggleUpdateDescriptionModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [currentTaskId, toggleUpdateDescriptionModal, updateTaskDescriptionMutation],
  )

  const onUpdateDeadline: UpdateTaskDeadlineModalProps['onSubmit'] = useCallback(
    async (values, setFields) => {
      try {
        await updateTaskDeadlineMutation({
          taskId: currentTaskId,
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
    [currentTaskId, toggleUpdateDeadlineModal, updateTaskDeadlineMutation],
  )

  const onClassifyTaskWorkType = async (workTypeId: IdType) => {
    await classifyTaskWorkTypeMutation({ taskId: currentTaskId, workType: workTypeId })
  }

  const onExecuteTask = useCallback<ExecuteTaskModalProps['onSubmit']>(
    async (values, setFields) => {
      try {
        await resolveTask({
          taskId: currentTaskId,
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
    [currentTaskId, originOnClose, resolveTask],
  )

  const onGetAct = useCallback<ExecuteTaskModalProps['onGetAct']>(
    async (values) => {
      try {
        const file = await getTaskWorkPerformedAct({
          taskId: currentTaskId,
          techResolution: values.techResolution,
        }).unwrap()

        if (file) {
          const blob = base64ToBytes(file)

          if (blob) {
            downloadFile(blob, MimetypeEnum.Pdf, `Акт о выполненных работах ${currentTaskId}`)
          }
        }
      } catch (error) {
        if (isErrorResponse(error) && isNotFoundError(error)) {
          showErrorNotification(getErrorDetail(error))
        } else {
          showErrorNotification(getTaskWorkPerformedActMessages.commonError)
        }
      }
    },
    [getTaskWorkPerformedAct, currentTaskId],
  )

  const onReclassificationRequestSubmit = useCallback<
    RequestTaskReclassificationModalProps['onSubmit']
  >(
    async (values, setFields) => {
      try {
        await createReclassificationRequest({
          taskId: currentTaskId,
          ...values,
        }).unwrap()
        closeTaskReclassificationModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [closeTaskReclassificationModal, createReclassificationRequest, currentTaskId],
  )

  const onTransferTaskToSecondLine = useCallback(
    async (
      values: TaskSecondLineFormFields,
      setFields: FormInstance<TaskSecondLineFormFields>['setFields'],
      closeTaskSecondLineModal: EmptyFn,
    ) => {
      try {
        await updateWorkGroup({ taskId: currentTaskId, ...values }).unwrap()
        closeTaskSecondLineModal()
        originOnClose()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [currentTaskId, originOnClose, updateWorkGroup],
  )

  const onTransferTaskToFirstLine = useCallback(
    async (
      values: TaskFirstLineFormFields,
      setFields: FormInstance<TaskFirstLineFormFields>['setFields'],
      closeTaskFirstLineModal: EmptyFn,
    ) => {
      try {
        await deleteWorkGroup({ taskId: currentTaskId, ...values }).unwrap()
        closeTaskFirstLineModal()
        originOnClose()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [originOnClose, deleteWorkGroup, currentTaskId],
  )

  const onUpdateAssignee = useCallback(
    async (assignee: TaskAssigneeModel['id']) => {
      await updateAssignee({ taskId: currentTaskId, assignee })
    },
    [currentTaskId, updateAssignee],
  )

  const onTakeTask = useCallback(async () => {
    await takeTask({ taskId: currentTaskId })
  }, [takeTask, currentTaskId])

  const onCreateTaskSuspendRequest: RequestTaskSuspendModalProps['onSubmit'] = useCallback(
    async (values: RequestTaskSuspendFormFields, setFields) => {
      try {
        await createSuspendRequest({
          taskId: currentTaskId,
          suspendReason: values.reason,
          suspendEndAt: mergeDateTime(values.endDate, values.endTime).toISOString(),
          externalRevisionLink: values.taskLink,
          externalResponsibleCompany: values.organization,
          comment: values.comment,
        }).unwrap()

        closeRequestTaskSuspendModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(
            getFieldsErrors(
              getFormErrorsFromBadRequestError(
                error.data as CreateTaskSuspendRequestBadRequestErrorResponse,
              ),
            ),
          )
        }
      }
    },
    [closeRequestTaskSuspendModal, createSuspendRequest, currentTaskId],
  )

  const onDeleteTaskSuspendRequest = useDebounceFn(async () => {
    await deleteSuspendRequest({ taskId: currentTaskId })
  }, [deleteSuspendRequest, currentTaskId])

  const onCreateTaskAttachment = useCallback<
    CreateRegistrationFNRequestModalProps['onCreateAttachment']
  >(
    async (options) => {
      await createTaskAttachment(
        { taskId: currentTaskId, parentType: TaskAttachmentTypeEnum.Journal },
        options,
      )
    },
    [createTaskAttachment, currentTaskId],
  )

  const onUpdateInfrastructure = async () => {
    if (!task?.infrastructureProject || !authUser) {
      console.error('Required data not supplied:', {
        infrastructureProject: task?.infrastructureProject,
        authUser,
      })
      return
    }

    await updateInfrastructureMutation({
      infrastructureId: task.infrastructureProject.id,
      manager: authUser.id,
    })
  }

  const onClickChangeInfrastructure = () => {
    if (!task?.infrastructureProject) {
      console.error('Required data not supplied:', {
        infrastructureProject: task?.infrastructureProject,
      })
      return
    }

    navigate(makeChangeInfrastructureRoute({ infrastructureId: task.infrastructureProject.id }), {
      state: getChangeInfrastructurePageLocationState(task),
    })
  }

  const title = task && userActions && (
    <TaskDetailsTitle
      id={task.id}
      type={task.type}
      assignee={task.assignee}
      workGroup={task.workGroup}
      status={task.status}
      extendedStatus={task.extendedStatus}
      olaStatus={task.olaStatus}
      suspendRequest={task.suspendRequest}
      system={task.system}
      userActions={userActions}
      onReloadTask={debouncedRefetchTask}
      onExecuteTask={onOpenExecuteTaskModal}
      onRegisterFN={debouncedToggleCreateRegistrationFNRequestModal}
      onRequestSuspend={debouncedToggleRequestTaskSuspendModal}
      onRequestReclassification={onOpenTaskReclassificationModal}
      onUpdateDescription={debouncedToggleUpdateDescriptionModal}
      onUpdateDeadline={debouncedToggleUpdateDeadlineModal}
      onCreateInternalTask={debouncedOpenCreateInternalTaskModal}
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
        open={!!currentTaskId}
        onClose={debouncedOnClose}
        width={650}
        styles={height ? { wrapper: { top: 'unset', height } } : undefined}
        title={title}
        mask={false}
      >
        <Space direction='vertical' $block size='middle'>
          <LoadingArea
            data-testid='task-reclassification-request-loading'
            isLoading={
              reclassificationRequestIsFetching ||
              createReclassificationRequestIsLoading ||
              (canGetTaskReclassificationRequest && userActionsIsFetching)
            }
            tip='Загрузка запроса на переклассификацию...'
            area='block'
          >
            {reclassificationRequest && userActions && (
              <React.Suspense fallback={<Spinner area='block' />}>
                <TaskReclassificationRequest
                  comment={reclassificationRequest.comment}
                  date={reclassificationRequest.createdAt}
                  user={reclassificationRequest.user}
                  onCancel={debouncedToggleConfirmCancelReclassificationRequestModal}
                  cancelBtnDisabled={
                    !userActions.tasks.CAN_RECLASSIFICATION_REQUESTS_CREATE?.includes(currentTaskId)
                  }
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
              {task?.suspendRequest && userActions && (
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
                            disabled:
                              !userActions.tasks.CAN_SUSPEND_REQUESTS_CREATE?.includes(
                                currentTaskId,
                              ),
                          }
                        : taskSuspendRequestStatus.isApproved
                        ? {
                            text: 'Вернуть в работу',
                            onClick: onTakeTask,
                            loading: takeTaskIsLoading,
                            disabled:
                              !userActions.tasks.CAN_SUSPEND_REQUESTS_CREATE?.includes(
                                currentTaskId,
                              ),
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
                    createdBy={task.createdBy}
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
                    permissions={permissions}
                    status={task.status}
                    email={task.email}
                    sapId={task.sapId}
                    weight={task.weight}
                    address={task.address}
                    company={task.company}
                    contactType={task.contactType}
                    severity={taskSeverityMap.get(task.severity)}
                    priority={taskPriorityMap.get(task.priorityCode)}
                    impact={taskImpactMap.get(task.initialImpact)}
                    supportGroup={task.supportGroup?.name}
                    productClassifier1={task.productClassifier1}
                    productClassifier2={task.productClassifier2}
                    productClassifier3={task.productClassifier3}
                    latitude={task.latitude}
                    longitude={task.longitude}
                    parentTask={task.parentTask}
                    openParentTask={debouncedOpenParentTask}
                    workGroup={task.workGroup}
                    workType={task.workType}
                    workTypes={workTypes}
                    workTypesIsLoading={workTypesIsFetching}
                    toggleEditWorkType={toggleWorkTypeEditable}
                    onSaveWorkType={onClassifyTaskWorkType}
                    saveWorkTypeIsLoading={classifyTaskWorkTypeIsLoading}
                    expanded={additionalInfoExpanded}
                    onExpand={onExpandAdditionalInfo}
                  />

                  <Divider />

                  <Row justify='space-between'>
                    <Col span={11}>
                      <WorkGroupBlock
                        id={task.id}
                        type={task.type}
                        recordId={task.recordId}
                        status={task.status}
                        workGroup={task.workGroup}
                        transferTaskToFirstLine={onTransferTaskToFirstLine}
                        transferTaskToFirstLineIsLoading={deleteWorkGroupIsLoading}
                        transferTaskToSecondLine={onTransferTaskToSecondLine}
                        transferTaskToSecondLineIsLoading={updateWorkGroupIsLoading}
                        userActions={userActions}
                      />
                    </Col>

                    <Col span={11}>
                      <AssigneeBlock
                        id={task.id}
                        assignee={task.assignee}
                        workGroup={task.workGroup}
                        updateAssignee={onUpdateAssignee}
                        updateAssigneeIsLoading={updateAssigneeIsLoading}
                        takeTask={onTakeTask}
                        takeTaskIsLoading={takeTaskIsLoading}
                        userActions={userActions}
                      />
                    </Col>
                  </Row>

                  <Row justify='space-between'>
                    <Col span={11}>
                      <Label label='Наблюдатели'>
                        {valueOr(
                          task.observers,
                          (observers) => (
                            <Space direction='vertical'>
                              {observers.map((obs) => (
                                <TaskAssignee
                                  {...obs}
                                  hasPopover
                                  showAvatar={false}
                                  showPhone={false}
                                />
                              ))}
                            </Space>
                          ),
                          'Не назначены',
                        )}
                      </Label>
                    </Col>

                    <Col span={11}></Col>
                  </Row>

                  <Divider />

                  {task.infrastructureProject && (
                    <Row justify='space-between'>
                      <Col span={11}>
                        {task.workType?.actions?.includes(
                          WorkTypeActionsEnum.CreateInfrastructureProject,
                        ) && (
                          <Button
                            disabled={
                              !permissions.infrastructureProjectRead &&
                              !permissions.anyStatusInfrastructureProjectRead
                            }
                            onClick={onClickChangeInfrastructure}
                          >
                            Изменение инфраструктуры
                          </Button>
                        )}
                      </Col>

                      <Col span={11}>
                        <Flex data-testid='support-manager-block' vertical gap='small'>
                          <Flex justify='space-between' gap='middle'>
                            <Text type='secondary'>Менеджер по сопровождению</Text>

                            {permissions.infrastructureProjectLeading && (
                              <Button
                                type='link'
                                loading={updateInfrastructureIsLoading}
                                onClick={onUpdateInfrastructure}
                              >
                                Назначить на себя
                              </Button>
                            )}
                          </Flex>

                          <Text>
                            {valueOr(
                              updateInfrastructureResult?.manager ||
                                task.infrastructureProject.manager,
                              (value) => (
                                <TaskAssignee {...value} hasPopover showPhone={false} />
                              ),
                              NO_ASSIGNEE_TEXT,
                            )}
                          </Text>
                        </Flex>
                      </Col>
                    </Row>
                  )}

                  <Tabs task={task} activeTab={activeTab} userActions={userActions} />
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
            supportGroup={task.supportGroup}
            resolutionClassifications={resolutionClassifications}
            resolutionClassificationsIsLoading={resolutionClassificationsIsFetching}
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

      {parentTaskOpened && task?.parentTask?.id && (
        <TaskDetails
          taskId={task.parentTask.id}
          onClose={debouncedCloseParentTask}
          additionalInfoExpanded={parentTaskAdditionalInfoExpanded}
          onExpandAdditionalInfo={toggleParentTaskAdditionalInfoExpanded}
          height={height}
        />
      )}

      {createInternalTaskModalOpened && task && (
        <React.Suspense
          fallback={
            <ModalFallback
              tip='Загрузка модалки создания внутренней заявки'
              open
              onCancel={debouncedOnCloseCreateInternalTaskModal}
            />
          }
        >
          <CreateInternalTaskModal
            open={createInternalTaskModalOpened}
            onCancel={debouncedOnCloseCreateInternalTaskModal}
            onSubmit={onCreateInternalTask}
            confirmLoading={createInternalTaskIsLoading}
            permissions={permissions}
            recordId={task.recordId}
            olaNextBreachTime={task.olaNextBreachTime}
            workGroups={workGroupsCatalog}
            workGroupsIsLoading={workGroupsCatalogIsFetching}
            onChangeWorkGroup={setSelectedTaskWorkGroup}
            users={users}
            usersIsLoading={usersIsFetching}
            executors={executors}
            executorsIsLoading={executorsIsFetching}
            observers={observers}
            observersIsLoading={observersIsFetching}
            workTypes={workTypes}
            workTypesIsLoading={workTypesIsFetching}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default TaskDetails
