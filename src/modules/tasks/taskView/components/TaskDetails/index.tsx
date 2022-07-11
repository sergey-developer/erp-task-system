import { CheckCircleOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { MenuProps, notification } from 'antd'
import React, { FC, useCallback, useMemo } from 'react'

import useAuthenticatedUser from 'modules/auth/hooks/useAuthenticatedUser'
import useTaskStatus from 'modules/tasks/hooks/useTaskStatus'
import { useResolveTaskMutation } from 'modules/tasks/tasks.service'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import { WorkGroupModel } from 'modules/workGroups/models'
import { ERROR_NOTIFICATION_DURATION } from 'shared/constants/notification'
import { MaybeNull } from 'shared/interfaces/utils'

import TaskSolutionModal, { TaskSolutionModalProps } from '../TaskSolutionModal'
import CardTitle from './CardTitle'
import MainDetails from './MainDetails'
import SecondaryDetails from './SecondaryDetails'
import { CardStyled, DividerStyled, RootWrapperStyled } from './styles'

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
    >
  >
  workGroupList: Array<WorkGroupModel>
  onClose: () => void
  onTaskResolved: () => void
  taskLoading: boolean
  workGroupListLoading: boolean
}

const TaskDetails: FC<TaskDetailsProps> = ({
  details,
  taskLoading,
  workGroupList,
  workGroupListLoading,
  onClose,
  onTaskResolved,
}) => {
  const user = useAuthenticatedUser()

  const [isTaskSolutionModalOpened, { toggle: toggleTaskSolutionModal }] =
    useBoolean(false)

  const [resolveTask, { isLoading: isTaskResolving }] = useResolveTaskMutation()

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
        onClick: toggleTaskSolutionModal,
      },
    ],
    [taskStatus, toggleTaskSolutionModal],
  )

  const handleResolutionSubmit = useCallback<
    TaskSolutionModalProps['onResolutionSubmit']
  >(
    async (values) => {
      try {
        await resolveTask({ taskId: details!.id, ...values }).unwrap()
        onTaskResolved()
      } catch (err) {
        notification.error({
          message: (err as any)?.data.detail,
          duration: ERROR_NOTIFICATION_DURATION,
        })
      }
    },
    [details],
  )

  const cardTitle = details?.id && (
    <CardTitle id={details.id} menuItems={menuItems} onClose={onClose} />
  )

  return (
    <RootWrapperStyled>
      <CardStyled
        title={cardTitle}
        loading={taskLoading}
        $isLoading={taskLoading}
      >
        {details && (
          <MainDetails
            recordId={details.recordId}
            title={details.title}
            createdAt={details.createdAt}
            olaNextBreachTime={details.olaNextBreachTime}
            name={details.name}
            address={details.address}
            contactService={details.contactService}
          />
        )}

        <DividerStyled />

        <SecondaryDetails
          status={details?.status}
          assignee={details?.assignee}
          workGroupListLoading={workGroupListLoading}
          workGroupList={workGroupList}
          workGroup={details?.workGroup}
        />

        {details && (
          <TaskSolutionModal
            isTaskResolving={isTaskResolving}
            onCancel={toggleTaskSolutionModal}
            onResolutionSubmit={handleResolutionSubmit}
            title={`Решение по заявке ${details.id}`}
            type={details.type}
            visible={isTaskSolutionModalOpened}
          />
        )}
      </CardStyled>
    </RootWrapperStyled>
  )
}

export default TaskDetails
