import { CheckCircleOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { MenuProps } from 'antd'
import React, { FC, useCallback, useMemo } from 'react'

import useCheckUserAuthenticated from 'modules/auth/hooks/useCheckUserAuthenticated'
import useTaskStatus from 'modules/tasks/hooks/useTaskStatus'
import {
  useResolveTaskMutation,
  useUpdateTaskWorkGroupMutation,
} from 'modules/tasks/services/tasks.service'
import useUpdateTaskAssignee from 'modules/tasks/taskView/hooks/useUpdateTaskAssignee'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import { WorkGroupListItemModel } from 'modules/workGroups/workGroupList/models'
import { AssigneeModel } from 'shared/interfaces/models'
import { MaybeNull } from 'shared/interfaces/utils'
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
  getWorkGroupListError: unknown
  onClose: () => void
  onTaskResolved: () => void
  refetchTask: () => void
  refetchTaskList: () => void
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

  const [updateTaskWorkGroup, { isLoading: updateTaskWorkGroupIsLoading }] =
    useUpdateTaskWorkGroupMutation()

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
        key: '1',
        label: '1st menu item',
      },
      {
        key: '2',
        label: '2nd menu item',
      },
      {
        key: '3',
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

  const handleUpdateTaskWorkGroup = async (
    workGroup: WorkGroupListItemModel['id'],
    closeTaskSecondLineModal: () => void,
  ) => {
    try {
      await updateTaskWorkGroup({ taskId: details!.id, workGroup }).unwrap()
      closeTaskSecondLineModal()
      onClose()
      refetchTaskList()
    } catch (error) {
      showErrorNotification(error)
    }
  }

  const handleUpdateTaskAssignee = async (assignee: AssigneeModel['id']) => {
    try {
      await updateTaskAssignee({ taskId: details!.id, assignee })
      refetchTask()
    } catch {}
  }

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
