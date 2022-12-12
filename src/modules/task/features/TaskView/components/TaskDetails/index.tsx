import { useBoolean } from 'ahooks'
import { FormInstance } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import noop from 'lodash/noop'
import React, { FC, useCallback, useEffect } from 'react'

import ModalFallback from 'components/Modals/ModalFallback'
import Spinner from 'components/Spinner'
import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import {
  taskImpactMap,
  taskPriorityMap,
  taskSeverityMap,
} from 'modules/task/constants/dictionary'
import {
  CreateTaskReclassificationRequestMutationArgsModel,
  DeleteTaskWorkGroupMutationArgsModel,
  ResolveTaskMutationArgsModel,
  TakeTaskMutationArgsModel,
  TaskDetailsModel,
  TaskReclassificationRequestModel,
  UpdateTaskAssigneeMutationArgsModel,
  UpdateTaskWorkGroupMutationArgsModel,
} from 'modules/task/features/TaskView/models'
import { useTaskStatus } from 'modules/task/hooks'
import { TaskAssigneeModel } from 'modules/task/models'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import useDebounceFn from 'shared/hooks/useDebounceFn'
import { MaybeNull } from 'shared/interfaces/utils'
import { ErrorResponse } from 'shared/services/api'
import formatDate from 'shared/utils/date/formatDate'
import handleSetFieldsErrors from 'shared/utils/form/handleSetFieldsErrors'

import TaskDetailsTabs from '../TaskDetailsTabs'
import {
  TaskFirstLineFormErrors,
  TaskFirstLineFormFields,
} from '../TaskFirstLineModal/interfaces'
import { TaskReclassificationModalProps } from '../TaskReclassificationModal'
import { TaskReclassificationRequestFormErrors } from '../TaskReclassificationModal/interfaces'
import { loadingMessage as reclassificationRequestLoadingMessage } from '../TaskReclassificationRequest/constants'
import { TaskResolutionModalProps } from '../TaskResolutionModal'
import { TaskResolutionFormErrors } from '../TaskResolutionModal/interfaces'
import AdditionalInfo from './AdditionalInfo'
import CardTitle from './CardTitle'
import MainDetails from './MainDetails'
import SecondaryDetails from './SecondaryDetails'
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
    dimension='block'
    offset={['top', 10]}
    tip={reclassificationRequestLoadingMessage}
  />
)

export type TaskDetailsProps = {
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

  closeTaskDetails: () => void

  isGetTaskError: boolean
}

const TaskDetails: FC<TaskDetailsProps> = ({
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

  closeTaskDetails,

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
    if (isGetTaskError) closeTaskDetails()
  }, [isGetTaskError, closeTaskDetails])

  const handleResolutionSubmit = useCallback<
    TaskResolutionModalProps['onSubmit']
  >(
    async (values, setFields) => {
      if (!details?.id) return

      try {
        await resolveTask({ taskId: details.id, ...values })
        closeTaskDetails()
      } catch (exception) {
        const error = exception as ErrorResponse<TaskResolutionFormErrors>
        handleSetFieldsErrors(error, setFields)
      }
    },
    [details?.id, closeTaskDetails, resolveTask],
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

      await updateWorkGroup({ taskId: details.id, workGroup })
      closeTaskSecondLineModal()
      closeTaskDetails()
    },
    [details?.id, closeTaskDetails, updateWorkGroup],
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
        closeTaskDetails()
      } catch (exception) {
        const error = exception as ErrorResponse<TaskFirstLineFormErrors>
        handleSetFieldsErrors(error, setFields)
      }
    },
    [closeTaskDetails, deleteWorkGroup, details?.id],
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

  const debouncedCloseTaskDetails = useDebounceFn(closeTaskDetails)

  const cardTitle = !taskIsLoading && details && (
    <CardTitle
      id={details.id}
      type={details.type}
      status={details.status}
      extendedStatus={details.extendedStatus}
      olaStatus={details.olaStatus}
      isAssignedToCurrentUser={isAssignedToCurrentUser}
      onClose={debouncedCloseTaskDetails}
      onClickExecuteTask={debouncedOpenTaskResolutionModal}
      onClickRequestReclassification={debouncedOpenTaskReclassificationModal}
    />
  )

  return (
    <RootWrapperStyled>
      <CardStyled
        data-testid='task-details'
        title={cardTitle}
        loading={taskIsLoading}
        $breakpoints={breakpoints}
      >
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

                <DividerStyled />
              </React.Suspense>
            )}

        {details && (
          <>
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

            <DividerStyled />

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

            <TaskDetailsTabs details={details} />

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
          </>
        )}
      </CardStyled>
    </RootWrapperStyled>
  )
}

export default TaskDetails
