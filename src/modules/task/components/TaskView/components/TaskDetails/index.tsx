import { CheckCircleOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { MenuProps } from 'antd'
import React, { FC, useCallback, useMemo } from 'react'

import useCheckUserAuthenticated from 'modules/auth/hooks/useCheckUserAuthenticated'
import useResolveTask from 'modules/task/components/TaskView/hooks/useResolveTask'
import useUpdateTaskAssignee from 'modules/task/components/TaskView/hooks/useUpdateTaskAssignee'
import useUpdateTaskWorkGroup from 'modules/task/components/TaskView/hooks/useUpdateTaskWorkGroup'
import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import getTransferTaskSecondLineErrors from 'modules/task/components/TaskView/utils/getTransferTaskSecondLineErrors'
import useTaskStatus from 'modules/task/hooks/useTaskStatus'
import { WorkGroupListItemModel } from 'modules/workGroup/components/WorkGroupList/models'
import { AssigneeModel } from 'shared/interfaces/models'
import { MaybeNull } from 'shared/interfaces/utils'
import { ErrorResponse, getErrorDetail } from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'
import showMultipleErrorNotification from 'shared/utils/notifications/showMultipleErrorNotification'

import TaskReclassificationModal, {
  TaskReclassificationModalProps,
} from '../TaskReclassificationModal'
import TaskResolutionModal, {
  TaskResolutionModalProps,
} from '../TaskResolutionModal'
import { TaskResolutionFormErrors } from '../TaskResolutionModal/interfaces'
import CardTitle from './CardTitle'
import MainDetails from './MainDetails'
import SecondaryDetails from './SecondaryDetails'
import { CardStyled, DividerStyled, RootWrapperStyled } from './styles'
import TaskDetailsTabs from './TaskDetailsTabs'
import { TaskDetailsTabsEnum } from './TaskDetailsTabs/constants'

type TaskDetailsProps = {
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
      | 'workGroup'
      | 'assignee'
      | 'status'
      | 'type'
      | 'techResolution'
      | 'userResolution'
      | 'description'
      | 'olaStatus'
      | 'olaEstimatedTime'
      | 'olaNextBreachTime'
    >
  >
  taskIsLoading: boolean
  workGroupList: Array<WorkGroupListItemModel>
  workGroupListIsLoading: boolean
  onClose: () => void
  onTaskResolved: () => void
  refetchTask: () => void
  refetchTaskList: () => void
  getWorkGroupListError?: ErrorResponse
}

const TaskDetails: FC<TaskDetailsProps> = ({
  details,
  taskIsLoading,
  workGroupList,
  workGroupListIsLoading,
  getWorkGroupListError,
  onClose,
  onTaskResolved,
  refetchTask,
  refetchTaskList,
}) => {
  const [isTaskResolutionModalOpened, { toggle: toggleTaskResolutionModal }] =
    useBoolean(false)

  const [
    isTaskReclassificationModalOpened,
    { toggle: toggleTaskReclassificationModal },
  ] = useBoolean(false)

  const {
    fn: resolveTask,
    state: { isLoading: isTaskResolving },
  } = useResolveTask()

  const {
    fn: updateTaskWorkGroup,
    state: { isLoading: updateTaskWorkGroupIsLoading },
  } = useUpdateTaskWorkGroup()

  const {
    fn: updateTaskAssignee,
    state: { isLoading: updateTaskAssigneeIsLoading },
  } = useUpdateTaskAssignee()

  const taskStatus = useTaskStatus(details?.status)

  const isAssignedToCurrentUser = useCheckUserAuthenticated(
    details?.assignee?.id,
  )

  const menuItems = useMemo<MenuProps['items']>(
    () => [
      {
        key: 1,
        disabled: !taskStatus.isInProgress || !isAssignedToCurrentUser,
        icon: <CheckCircleOutlined />,
        label: 'Выполнить заявку',
        onClick: toggleTaskResolutionModal,
      },
      {
        key: 2,
        icon: <CheckCircleOutlined />,
        label: 'Запросить переклассификацию',
        onClick: toggleTaskReclassificationModal,
      },
    ],
    [
      taskStatus.isInProgress,
      isAssignedToCurrentUser,
      toggleTaskResolutionModal,
      toggleTaskReclassificationModal,
    ],
  )

  const handleResolutionSubmit = useCallback<
    TaskResolutionModalProps['onSubmit']
  >(
    async (values, setFields) => {
      try {
        await resolveTask({ taskId: details!.id, ...values })
        onTaskResolved()
      } catch (exception) {
        const error = exception as ErrorResponse<TaskResolutionFormErrors>
        const errorDetail = getErrorDetail(error)
        showMultipleErrorNotification(errorDetail)

        setFields([
          {
            name: 'techResolution',
            errors: error.data.techResolution,
          },
          { name: 'userResolution', errors: error.data.userResolution },
        ])
      }
    },
    [details, onTaskResolved, resolveTask],
  )

  const handleReclassificationSubmit = useCallback<
    TaskReclassificationModalProps['onSubmit']
  >(async (values, setFields) => {
    console.log({ values, setFields })
  }, [])

  const handleUpdateTaskWorkGroup = useCallback(
    async (
      workGroup: WorkGroupListItemModel['id'],
      closeTaskSecondLineModal: () => void,
    ) => {
      try {
        await updateTaskWorkGroup({ taskId: details!.id, workGroup })
        closeTaskSecondLineModal()
        onClose()
        refetchTaskList()
      } catch (exception) {
        const errors = getTransferTaskSecondLineErrors(
          exception as ErrorResponse,
        )
        showMultipleErrorNotification(errors)
      }
    },
    [details, onClose, refetchTaskList, updateTaskWorkGroup],
  )

  const handleUpdateTaskAssignee = useCallback(
    async (assignee: AssigneeModel['id']) => {
      try {
        await updateTaskAssignee({ taskId: details!.id, assignee })
        refetchTask()
      } catch {
        showErrorNotification('Невозможно изменить исполнителя')
      }
    },
    [details, refetchTask, updateTaskAssignee],
  )

  const cardTitle = details?.id && (
    <CardTitle id={details.id} menuItems={menuItems} onClose={onClose} />
  )

  return (
    <RootWrapperStyled>
      <CardStyled title={cardTitle} loading={taskIsLoading}>
        {details && (
          <>
            <MainDetails
              recordId={details.recordId}
              title={details.title}
              createdAt={details.createdAt}
              name={details.name}
              address={details.address}
              contactService={details.contactService}
              olaStatus={details.olaStatus}
              olaEstimatedTime={details.olaEstimatedTime}
              olaNextBreachTime={details.olaNextBreachTime}
            />

            <DividerStyled />

            <SecondaryDetails
              id={details.id}
              status={details.status}
              assignee={details.assignee}
              workGroup={details.workGroup}
              workGroupList={workGroupList}
              workGroupListIsLoading={workGroupListIsLoading}
              getWorkGroupListError={getWorkGroupListError}
              transferTask={handleUpdateTaskWorkGroup}
              transferTaskIsLoading={updateTaskWorkGroupIsLoading}
              updateTaskAssignee={handleUpdateTaskAssignee}
              updateTaskAssigneeIsLoading={updateTaskAssigneeIsLoading}
            />

            <TaskDetailsTabs
              details={details}
              defaultTab={TaskDetailsTabsEnum.Description}
            />

            {isTaskResolutionModalOpened && (
              <TaskResolutionModal
                visible
                isTaskResolving={isTaskResolving}
                onCancel={toggleTaskResolutionModal}
                onSubmit={handleResolutionSubmit}
                recordId={details.recordId}
                type={details.type}
              />
            )}

            {isTaskReclassificationModalOpened && (
              <TaskReclassificationModal
                visible
                recordId={details.recordId}
                onSubmit={handleReclassificationSubmit}
                onCancel={toggleTaskReclassificationModal}
              />
            )}
          </>
        )}
      </CardStyled>
    </RootWrapperStyled>
  )
}

export default TaskDetails
