import { CheckCircleOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { MenuProps } from 'antd'
import React, { FC, useCallback, useMemo } from 'react'

import useCheckUserAuthenticated from 'modules/auth/hooks/useCheckUserAuthenticated'
import useUpdateTaskAssignee from 'modules/task/components/TaskView/hooks/useUpdateTaskAssignee'
import useUpdateTaskWorkGroup from 'modules/task/components/TaskView/hooks/useUpdateTaskWorkGroup'
import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import getTransferTaskSecondLineError from 'modules/task/components/TaskView/utils/getTransferTaskSecondLineError'
import useTaskStatus from 'modules/task/hooks/useTaskStatus'
import { useResolveTaskMutation } from 'modules/task/services/tasks.service'
import { WorkGroupListItemModel } from 'modules/workGroup/components/WorkGroupList/models'
import { AssigneeModel } from 'shared/interfaces/models'
import { MaybeNull } from 'shared/interfaces/utils'
import { ErrorResponse } from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

import TaskResolutionModal, {
  TaskResolutionModalProps,
} from '../TaskResolutionModal'
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
      | 'olaNextBreachTime'
      | 'workGroup'
      | 'assignee'
      | 'status'
      | 'type'
      | 'techResolution'
      | 'userResolution'
      | 'description'
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

  const [resolveTask, { isLoading: isTaskResolving }] = useResolveTaskMutation()

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
        key: 3,
        disabled: !taskStatus.isInProgress || !isAssignedToCurrentUser,
        icon: <CheckCircleOutlined />,
        label: 'Выполнить заявку',
        onClick: toggleTaskResolutionModal,
      },
    ],
    [taskStatus, isAssignedToCurrentUser, toggleTaskResolutionModal],
  )

  const handleResolutionSubmit = useCallback<
    TaskResolutionModalProps['onResolutionSubmit']
  >(
    async (values) => {
      try {
        await resolveTask({ taskId: details!.id, ...values }).unwrap()
        onTaskResolved()
      } catch (error) {
        showErrorNotification(error)
      }
    },
    [details, onTaskResolved, resolveTask],
  )

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
      } catch (error) {
        const errorMessage = getTransferTaskSecondLineError(
          error as ErrorResponse,
        )
        showErrorNotification(errorMessage)
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
              olaNextBreachTime={details.olaNextBreachTime}
              name={details.name}
              address={details.address}
              contactService={details.contactService}
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

            <TaskResolutionModal
              isTaskResolving={isTaskResolving}
              onCancel={toggleTaskResolutionModal}
              onResolutionSubmit={handleResolutionSubmit}
              title={`Решение по заявке ${details.recordId}`}
              type={details.type}
              visible={isTaskResolutionModalOpened}
            />
          </>
        )}
      </CardStyled>
    </RootWrapperStyled>
  )
}

export default TaskDetails
