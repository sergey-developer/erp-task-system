import { CheckCircleOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { MenuProps } from 'antd'
import React, { FC, useCallback, useMemo } from 'react'

import useTaskStatus from 'modules/tasks/hooks/useTaskStatus'
import { useResolveTaskMutation } from 'modules/tasks/tasks.service'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import { WorkGroupModel } from 'modules/workGroups/models'
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
  const [isTaskSolutionModalOpened, { toggle: toggleTaskSolutionModal }] =
    useBoolean(false)

  const [resolveTask, { isLoading: isTaskResolving, error: taskResolveError }] =
    useResolveTaskMutation()

  const taskStatus = useTaskStatus(details?.status)

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
        disabled: !taskStatus.isInProgress,
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
      const result = await resolveTask({ taskId: details!.id, ...values })
      if ('data' in result) {
        console.log('TASK RESOLVED')
        onTaskResolved()
      }
      if ('error' in result) {
        console.log('error', result.error)
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
            title={`Решение по заявке ${details.id}`}
            visible={isTaskSolutionModalOpened}
            onCancel={toggleTaskSolutionModal}
            onResolutionSubmit={handleResolutionSubmit}
            type={details.type}
          />
        )}
      </CardStyled>
    </RootWrapperStyled>
  )
}

export default TaskDetails
