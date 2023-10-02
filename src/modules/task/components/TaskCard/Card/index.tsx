import { useBoolean } from 'ahooks'
import { FormInstance } from 'antd'
import noop from 'lodash/noop'
import moment from 'moment-timezone'
import React, { FC, useCallback, useEffect } from 'react'

import { CustomMutationTrigger } from 'lib/rtk-query/types'

import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import {
  taskImpactMap,
  taskPriorityMap,
  taskSeverityMap,
  getTaskWorkPerformedActMessages,
} from 'modules/task/constants/task'
import { useTaskStatus } from 'modules/task/hooks/task'
import { useTaskSuspendRequestStatus } from 'modules/task/hooks/taskSuspendRequest'
import {
  CreateTaskReclassificationRequestMutationArgs,
  CreateTaskSuspendRequestBadRequestErrorResponse,
  CreateTaskSuspendRequestMutationArgs,
  DeleteTaskSuspendRequestMutationArgs,
  DeleteTaskWorkGroupMutationArgs,
  GetTaskWorkPerformedActMutationArgs,
  GetTaskWorkPerformedActSuccessResponse,
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

import { MimetypeEnum } from 'shared/constants/mimetype'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse, isNotFoundError } from 'shared/services/baseApi'
import { MaybeNull } from 'shared/types/utils'
import { base64ToArrayBuffer, clickDownloadLink } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'
import { mapUploadedFiles } from 'shared/utils/file'
import { getFieldsErrors, handleSetFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'

import CardTabs from '../../CardTabs'
import { RequestTaskReclassificationModalProps } from '../../RequestTaskReclassificationModal'
import { RequestTaskSuspendModalProps } from '../../RequestTaskSuspendModal'
import { RequestTaskSuspendFormFields } from '../../RequestTaskSuspendModal/types'
import { getFormErrorsFromBadRequestError } from '../../RequestTaskSuspendModal/utils'
import { TaskFirstLineFormFields } from '../../TaskFirstLineModal/types'
import { TaskResolutionModalProps } from '../../TaskResolutionModal'
import { TaskSecondLineFormFields } from '../../TaskSecondLineModal/types'
import AdditionalInfo from '../AdditionalInfo'
import CardTitle from '../CardTitle'
import MainDetails from '../MainDetails'
import SecondaryDetails from '../SecondaryDetails'
import { CardStyled, DividerStyled, RootWrapperStyled } from './styles'

const TaskResolutionModal = React.lazy(() => import('../../TaskResolutionModal'))

const RequestTaskReclassificationModal = React.lazy(
  () => import('../../RequestTaskReclassificationModal'),
)

const TaskReclassificationRequest = React.lazy(() => import('../../TaskReclassificationRequest'))

const RequestTaskSuspendModal = React.lazy(() => import('../../RequestTaskSuspendModal'))

const TaskSuspendRequest = React.lazy(() => import('../../TaskSuspendRequest'))

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

  createSuspendRequest: (data: CreateTaskSuspendRequestMutationArgs) => Promise<void>
  createSuspendRequestIsLoading: boolean
  cancelSuspendRequest: (data: DeleteTaskSuspendRequestMutationArgs) => Promise<void>
  cancelSuspendRequestIsLoading: boolean

  takeTask: (data: TakeTaskMutationArgs) => Promise<void>
  takeTaskIsLoading: boolean

  resolveTask: (data: ResolveTaskMutationArgs) => Promise<void>
  isTaskResolving: boolean

  getTaskWorkPerformedAct: CustomMutationTrigger<
    GetTaskWorkPerformedActMutationArgs,
    GetTaskWorkPerformedActSuccessResponse
  >
  taskWorkPerformedActIsLoading: boolean

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
  const taskStatus = useTaskStatus(task?.status)
  const taskSuspendRequestStatus = useTaskSuspendRequestStatus(task?.suspendRequest?.status)

  const userRole = useUserRole()
  const isAssignedToCurrentUser = useCheckUserAuthenticated(task?.assignee?.id)

  const debouncedCloseTaskCard = useDebounceFn(closeTaskCard)

  const debouncedRefetchTask = useDebounceFn(refetchTask)

  const [
    isTaskResolutionModalOpened,
    { setTrue: openTaskResolutionModal, setFalse: closeTaskResolutionModal },
  ] = useBoolean(false)

  const debouncedOpenTaskResolutionModal = useDebounceFn(openTaskResolutionModal)

  const [
    isTaskReclassificationModalOpened,
    { setTrue: openTaskReclassificationModal, setFalse: closeTaskReclassificationModal },
  ] = useBoolean(false)

  const debouncedOpenTaskReclassificationModal = useDebounceFn(openTaskReclassificationModal)

  const [
    isRequestTaskSuspendModalOpened,
    { setTrue: openRequestTaskSuspendModal, setFalse: closeRequestTaskSuspendModal },
  ] = useBoolean(false)

  const debouncedOpenRequestTaskSuspendModal = useDebounceFn(openRequestTaskSuspendModal)

  useEffect(() => {
    if (isGetTaskError) closeTaskCard()
  }, [isGetTaskError, closeTaskCard])

  const handleResolutionSubmit = useCallback<TaskResolutionModalProps['onSubmit']>(
    async (values, setFields) => {
      if (!task) return

      try {
        await resolveTask({
          taskId: task.id,
          techResolution: values.techResolution.trim(),
          userResolution: values.userResolution?.trim(),
          attachments: values.attachments ? mapUploadedFiles(values.attachments) : undefined,
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

  const handleGetAct = useCallback<TaskResolutionModalProps['onGetAct']>(
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
      closeTaskSecondLineModal: () => void,
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
      setFields: FormInstance['setFields'],
      closeTaskFirstLineModal: () => void,
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
          comment: values.comment,
          suspendReason: values.reason,
          suspendEndAt: moment(values.endDate)
            .set('hours', values.endTime.get('hours'))
            .set('minutes', values.endTime.get('minutes'))
            .toISOString(),
        })

        closeRequestTaskSuspendModal()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            const badRequestError = error as CreateTaskSuspendRequestBadRequestErrorResponse

            handleSetFieldsErrors(
              {
                ...badRequestError,
                data: getFormErrorsFromBadRequestError(badRequestError),
              },
              setFields,
            )
          }
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
      workGroup={task.workGroup}
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
      <CardStyled data-testid='task-card' title={cardTitle} loading={taskIsLoading}>
        <Space direction='vertical' $block size='middle'>
          {
            <LoadingArea
              data-testid='task-card-reclassification-request-loading'
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
            <Space data-testid='task-card-details' direction='vertical' $block size='middle'>
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
                      open={isTaskResolutionModalOpened}
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
                    onGetAct={handleGetAct}
                    getActIsLoading={taskWorkPerformedActIsLoading}
                  />
                </React.Suspense>
              )}

              {isTaskReclassificationModalOpened && (
                <React.Suspense
                  fallback={
                    <ModalFallback
                      open={isTaskReclassificationModalOpened}
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
                      open={isRequestTaskSuspendModalOpened}
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
