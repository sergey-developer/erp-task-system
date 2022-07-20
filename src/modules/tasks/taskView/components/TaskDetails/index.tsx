import { CheckCircleOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { MenuProps, notification } from 'antd'
import React, { FC, useCallback, useMemo } from 'react'

import useAuthenticatedUser from 'modules/auth/hooks/useAuthenticatedUser'
import useTaskStatus from 'modules/tasks/hooks/useTaskStatus'
import {
  useResolveTaskMutation,
  useUpdateTaskWorkGroupMutation,
} from 'modules/tasks/services/tasks.service'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import { WorkGroupListItemModel } from 'modules/workGroups/workGroupList/models'
import { ERROR_NOTIFICATION_DURATION } from 'shared/constants/notification'
import { MaybeNull } from 'shared/interfaces/utils'
import { getErrorDetail } from 'shared/services/api'

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
  taskLoading: boolean
  workGroupList: Array<WorkGroupListItemModel>
  workGroupListLoading: boolean
  onClose: () => void
  onTaskResolved: () => void
  refetchTaskList: () => void
}

const TaskDetails: FC<TaskDetailsProps> = ({
  details,
  taskLoading,
  workGroupList,
  workGroupListLoading,
  onClose,
  onTaskResolved,
  refetchTaskList,
}) => {
  const user = useAuthenticatedUser()

  const [isTaskResolutionModalOpened, { toggle: toggleTaskResolutionModal }] =
    useBoolean(false)

  const [resolveTask, { isLoading: isTaskResolving }] = useResolveTaskMutation()

  const [updateTaskWorkGroup, { isLoading: isTaskWorkGroupUpdating }] =
    useUpdateTaskWorkGroupMutation()

  const taskStatus = useTaskStatus(details?.status)

  const isAssignedToCurrentUser = useMemo(() => {
    if (!user || !details) {
      return false
    }
    return user.id === details.assignee?.id
  }, [details, user])

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
        notification.error({
          message: getErrorDetail(error as any),
          duration: ERROR_NOTIFICATION_DURATION,
        })
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
      notification.error({
        message: getErrorDetail(error as any),
        duration: ERROR_NOTIFICATION_DURATION,
      })
    }
  }

  const cardTitle = details?.id && (
    <CardTitle id={details.id} menuItems={menuItems} onClose={onClose} />
  )

  return (
    <RootWrapperStyled>
      <CardStyled title={cardTitle} loading={taskLoading}>
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
              workGroupListLoading={workGroupListLoading}
              transferTask={handleUpdateTaskWorkGroup}
              transferTaskIsLoading={isTaskWorkGroupUpdating}
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
