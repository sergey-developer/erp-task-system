import { useBoolean } from 'ahooks'
import { App, Button, Col, Divider, Drawer, Flex, FormInstance, Row, Typography } from 'antd'
import debounce from 'lodash/debounce'
import React, { FC, useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthUser } from 'modules/auth/hooks'
import { useUpdateInfrastructure } from 'modules/infrastructures/hooks'
import { getChangeInfrastructurePageLocationState } from 'modules/infrastructures/pages/ChangeInfrastructurePage/utils'
import { makeChangeInfrastructurePageLink } from 'modules/infrastructures/utils/pagesLinks'
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
  useClassifyTaskWorkType,
  useCreateTaskAttachment,
  useCreateTaskRegistrationFNRequest,
  useGetTask,
  useGetTaskRegistrationRequestRecipientsFN,
  useResolveTask,
  useTakeTask,
  useTaskExtendedStatus,
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
import { UserPermissionsEnum } from 'modules/user/constants'
import { useGetUserActions, useUserPermissions } from 'modules/user/hooks'
import { WorkTypeActionsEnum } from 'modules/warehouse/constants/workType/enum'
import { useGetWorkTypes } from 'modules/warehouse/hooks/workType'

import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import { DEFAULT_DEBOUNCE_VALUE, NO_ASSIGNEE_TEXT } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { useGetFaChangeTypes } from 'shared/hooks/catalogs/faChangeTypes'
import { useSystemSettingsState } from 'shared/hooks/system'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
} from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { EmptyFn } from 'shared/types/utils'
import { base64ToBytes, isFalse, isTrue, valueOr } from 'shared/utils/common'
import { formatDate, mergeDateTime } from 'shared/utils/date'
import { downloadFile, extractIdsFromFilesResponse, extractOriginFiles } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'

import { useGetResolutionClassifications } from '../../../../shared/hooks/catalogs/resolutionClassifications'
import TaskAssignee from '../TaskAssignee'
import AssigneeBlock from './AssigneeBlock'
import WorkGroupBlock from './WorkGroupBlock'

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

  const authUser = useAuthUser()
  const permissions = useUserPermissions([
    UserPermissionsEnum.InfrastructureProjectRead,
    UserPermissionsEnum.AnyStatusInfrastructureProjectRead,
    UserPermissionsEnum.InfrastructureProjectLeading,
    UserPermissionsEnum.ClassificationOfWorkTypes,
  ])

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
  } = useGetTaskReclassificationRequest({ taskId }, { skip: !canGetTaskReclassificationRequest })

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

  const { data: faChangeTypes = [], isFetching: faChangeTypesIsFetching } = useGetFaChangeTypes(
    undefined,
    { skip: !createRegistrationFNRequestModalOpened },
  )

  const {
    data: taskRegistrationRequestRecipients,
    isFetching: taskRegistrationRequestRecipientsIsFetching,
  } = useGetTaskRegistrationRequestRecipientsFN(
    { taskId },
    { skip: !createRegistrationFNRequestModalOpened },
  )

  const [workTypeIsEditable, { toggle: toggleWorkTypeEditable }] = useBoolean(false)

  const { currentData: workTypes = [], isFetching: workTypesIsFetching } = useGetWorkTypes(
    { taskType: task?.type! },
    { skip: !workTypeIsEditable || !task?.type },
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
  } = useGetResolutionClassifications(
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
          taskId,
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
    [createTaskRegistrationFNRequest, taskId, toggleCreateRegistrationFNRequestModal],
  )

  const onUpdateDescription: UpdateTaskDescriptionModalProps['onSubmit'] = useCallback(
    async (values, setFields) => {
      try {
        await updateTaskDescriptionMutation({ taskId, ...values }).unwrap()
        toggleUpdateDescriptionModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [taskId, toggleUpdateDescriptionModal, updateTaskDescriptionMutation],
  )

  const onUpdateDeadline: UpdateTaskDeadlineModalProps['onSubmit'] = useCallback(
    async (values, setFields) => {
      try {
        await updateTaskDeadlineMutation({
          taskId,
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
    [taskId, toggleUpdateDeadlineModal, updateTaskDeadlineMutation],
  )

  const onClassifyTaskWorkType = async (workTypeId: IdType) => {
    await classifyTaskWorkTypeMutation({ taskId, workType: workTypeId })
  }

  const onExecuteTask = useCallback<ExecuteTaskModalProps['onSubmit']>(
    async (values, setFields) => {
      try {
        await resolveTask({
          taskId,
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
    [taskId, originOnClose, resolveTask],
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
        if (isErrorResponse(error) && isNotFoundError(error)) {
          showErrorNotification(getErrorDetail(error))
        } else {
          showErrorNotification(getTaskWorkPerformedActMessages.commonError)
        }
      }
    },
    [getTaskWorkPerformedAct, task],
  )

  const onReclassificationRequestSubmit = useCallback<
    RequestTaskReclassificationModalProps['onSubmit']
  >(
    async (values, setFields) => {
      try {
        await createReclassificationRequest({
          taskId,
          ...values,
        }).unwrap()
        closeTaskReclassificationModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [closeTaskReclassificationModal, createReclassificationRequest, taskId],
  )

  const onTransferTaskToSecondLine = useCallback(
    async (
      values: TaskSecondLineFormFields,
      setFields: FormInstance<TaskSecondLineFormFields>['setFields'],
      closeTaskSecondLineModal: EmptyFn,
    ) => {
      try {
        await updateWorkGroup({ taskId, ...values }).unwrap()
        closeTaskSecondLineModal()
        originOnClose()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [taskId, originOnClose, updateWorkGroup],
  )

  const onTransferTaskToFirstLine = useCallback(
    async (
      values: TaskFirstLineFormFields,
      setFields: FormInstance<TaskFirstLineFormFields>['setFields'],
      closeTaskFirstLineModal: EmptyFn,
    ) => {
      try {
        await deleteWorkGroup({ taskId, ...values }).unwrap()
        closeTaskFirstLineModal()
        originOnClose()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [originOnClose, deleteWorkGroup, taskId],
  )

  const onUpdateAssignee = useCallback(
    async (assignee: TaskAssigneeModel['id']) => {
      await updateAssignee({ taskId, assignee })
    },
    [taskId, updateAssignee],
  )

  const onTakeTask = useCallback(async () => {
    await takeTask({ taskId })
  }, [takeTask, taskId])

  const onCreateTaskSuspendRequest: RequestTaskSuspendModalProps['onSubmit'] = useCallback(
    async (values: RequestTaskSuspendFormFields, setFields) => {
      try {
        await createSuspendRequest({
          taskId,
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
    [closeRequestTaskSuspendModal, createSuspendRequest, taskId],
  )

  const onDeleteTaskSuspendRequest = useDebounceFn(async () => {
    await deleteSuspendRequest({ taskId })
  }, [deleteSuspendRequest, taskId])

  const onCreateTaskAttachment = useCallback<
    CreateRegistrationFNRequestModalProps['onCreateAttachment']
  >(
    async (options) => {
      await createTaskAttachment({ taskId, parentType: TaskAttachmentTypeEnum.Journal }, options)
    },
    [createTaskAttachment, taskId],
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

    navigate(
      makeChangeInfrastructurePageLink({ infrastructureId: task.infrastructureProject.id }),
      { state: getChangeInfrastructurePageLocationState(task) },
    )
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
                    !userActions.tasks.CAN_RECLASSIFICATION_REQUESTS_CREATE.includes(taskId)
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
                              !userActions.tasks.CAN_SUSPEND_REQUESTS_CREATE.includes(taskId),
                          }
                        : taskSuspendRequestStatus.isApproved
                        ? {
                            text: 'Вернуть в работу',
                            onClick: onTakeTask,
                            loading: takeTaskIsLoading,
                            disabled:
                              !userActions.tasks.CAN_SUSPEND_REQUESTS_CREATE.includes(taskId),
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
                    permissions={permissions}
                    status={task.status}
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
                        extendedStatus={task.extendedStatus}
                        workGroup={task.workGroup}
                        transferTaskToFirstLine={onTransferTaskToFirstLine}
                        transferTaskToFirstLineIsLoading={deleteWorkGroupIsLoading}
                        transferTaskToSecondLine={onTransferTaskToSecondLine}
                        transferTaskToSecondLineIsLoading={updateWorkGroupIsLoading}
                        taskSuspendRequestStatus={task.suspendRequest?.status}
                        userActions={userActions}
                      />
                    </Col>

                    <Col span={11}>
                      <AssigneeBlock
                        id={task.id}
                        status={task.status}
                        extendedStatus={task.extendedStatus}
                        assignee={task.assignee}
                        workGroup={task.workGroup}
                        updateAssignee={onUpdateAssignee}
                        updateAssigneeIsLoading={updateAssigneeIsLoading}
                        takeTask={onTakeTask}
                        takeTaskIsLoading={takeTaskIsLoading}
                        taskSuspendRequestStatus={task.suspendRequest?.status}
                        userActions={userActions}
                      />
                    </Col>
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
    </>
  )
}

export default TaskDetails
