import { useBoolean } from 'ahooks'
import { FormInstance } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import noop from 'lodash/noop'
import React, { FC, useCallback, useEffect } from 'react'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import Spinner from 'components/Spinner'
import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import {
  taskImpactMap,
  taskPriorityMap,
  taskSeverityMap,
} from 'modules/task/constants/dictionary'
import { useTaskStatus } from 'modules/task/hooks'
import {
  CreateTaskReclassificationRequestMutationArgsModel,
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
import { ErrorResponse } from 'shared/services/api'
import { formatDate } from 'shared/utils/date'
import { handleSetFieldsErrors } from 'shared/utils/form'

import AdditionalInfo from '../AdditionalInfo'
import TaskCardTabs from '../CardTabs'
import CardTitle from '../CardTitle'
import MainDetails from '../MainDetails'
import SecondaryDetails from '../SecondaryDetails'
import {
  TaskFirstLineFormErrors,
  TaskFirstLineFormFields,
} from '../TaskFirstLineModal/interfaces'
import { TaskReclassificationModalProps } from '../TaskReclassificationModal'
import { TaskReclassificationRequestFormErrors } from '../TaskReclassificationModal/interfaces'
import { loadingMessage as reclassificationRequestLoadingMessage } from '../TaskReclassificationRequest/constants'
import { TaskResolutionModalProps } from '../TaskResolutionModal'
import { TaskResolutionFormErrors } from '../TaskResolutionModal/interfaces'
import { CardStyled, DividerStyled, RootWrapperStyled } from './styles'

const TaskReclassificationRequest = React.lazy(
  () => import('../TaskReclassificationRequest'),
)

const TaskResolutionModal = React.lazy(() => import('../TaskResolutionModal'))

const TaskReclassificationModal = React.lazy(
  () => import('../TaskReclassificationModal'),
)

const reclassificationRequestSpinner = (
  <Spinner
    data-testid='task-card-reclassification-request-spinner'
    dimension='block'
    tip={reclassificationRequestLoadingMessage}
  />
)

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
    >
  >

  taskIsLoading: boolean

  reclassificationRequest: MaybeNull<TaskReclassificationRequestModel>
  reclassificationRequestIsLoading: boolean
  createReclassificationRequest: (
    data: CreateTaskReclassificationRequestMutationArgsModel,
  ) => Promise<void>
  createReclassificationRequestIsLoading: boolean

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

  useEffect(() => {
    if (isGetTaskError) closeTaskCard()
  }, [isGetTaskError, closeTaskCard])

  const handleResolutionSubmit = useCallback<
    TaskResolutionModalProps['onSubmit']
  >(
    async (values, setFields) => {
      if (!details?.id) return

      try {
        await resolveTask({ taskId: details.id, ...values })
        closeTaskCard()
      } catch (exception) {
        const error = exception as ErrorResponse<TaskResolutionFormErrors>
        handleSetFieldsErrors(error, setFields)
      }
    },
    [details?.id, closeTaskCard, resolveTask],
  )

  const handleReclassificationRequestSubmit = useCallback<
    TaskReclassificationModalProps['onSubmit']
  >(
    async (values, setFields) => {
      if (!details?.id) return

      try {
        await createReclassificationRequest({
          taskId: details.id,
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

  const handleTransferTaskToSecondLine = useCallback(
    async (
      workGroup: WorkGroupListItemModel['id'],
      closeTaskSecondLineModal: () => void,
    ) => {
      if (!details?.id) return

      try {
        await updateWorkGroup({ taskId: details.id, workGroup })
        closeTaskSecondLineModal()
        closeTaskCard()
      } catch {
        // todo: использовать в модалке форму и реализовать обработку ошибок. затем поправить тесты
      }
    },
    [details?.id, closeTaskCard, updateWorkGroup],
  )

  const handleTransferTaskToFirstLine = useCallback(
    async (
      values: TaskFirstLineFormFields,
      setFields: FormInstance['setFields'],
      closeTaskFirstLineModal: () => void,
    ) => {
      if (!details?.id) return

      try {
        await deleteWorkGroup({ taskId: details.id, ...values })
        closeTaskFirstLineModal()
        closeTaskCard()
      } catch (exception) {
        const error = exception as ErrorResponse<TaskFirstLineFormErrors>
        handleSetFieldsErrors(error, setFields)
      }
    },
    [closeTaskCard, deleteWorkGroup, details?.id],
  )

  const handleUpdateAssignee = useCallback(
    async (assignee: TaskAssigneeModel['id']) => {
      if (!details?.id) return
      await updateAssignee({ taskId: details.id, assignee })
    },
    [details?.id, updateAssignee],
  )

  const debouncedTakeTask = useDebounceFn(takeTask)

  const handleTakeTask = useCallback(async () => {
    if (!details?.id) return
    await debouncedTakeTask({ taskId: details.id })
  }, [debouncedTakeTask, details?.id])

  const debouncedCloseTaskCard = useDebounceFn(closeTaskCard)

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
          {reclassificationRequestIsLoading ||
          createReclassificationRequestIsLoading
            ? reclassificationRequestSpinner
            : reclassificationRequest && (
                <React.Suspense fallback={reclassificationRequestSpinner}>
                  <TaskReclassificationRequest
                    title='Запрошена переклассификация:'
                    comment={reclassificationRequest.comment.text}
                    createdAt={reclassificationRequest.createdAt}
                    user={reclassificationRequest.user}
                    actionText='Отменить запрос'
                    onAction={noop}
                    actionDisabled={taskStatus.isAwaiting}
                  />
                </React.Suspense>
              )}

          {details && (
            <Space direction='vertical' $block size='middle'>
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
                  <TaskReclassificationModal
                    recordId={details.recordId}
                    isLoading={createReclassificationRequestIsLoading}
                    onSubmit={handleReclassificationRequestSubmit}
                    onCancel={closeTaskReclassificationModal}
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
