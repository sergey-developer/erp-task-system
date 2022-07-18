import { CheckCircleOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { MenuProps, Tabs, notification } from 'antd'
import React, { FC, useCallback, useMemo } from 'react'

import useAuthenticatedUser from 'modules/auth/hooks/useAuthenticatedUser'
import useTaskStatus from 'modules/tasks/hooks/useTaskStatus'
import {
  useResolveTaskMutation,
  useUpdateTaskWorkGroupMutation,
} from 'modules/tasks/services/tasks.service'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import { WorkGroupModel } from 'modules/workGroups/models'
import { ERROR_NOTIFICATION_DURATION } from 'shared/constants/notification'
import { MaybeNull } from 'shared/interfaces/utils'

import TaskResolutionModal, {
  TaskResolutionModalProps,
} from '../TaskResolutionModal'
import CardTitle from './CardTitle'
import MainDetails from './MainDetails'
import SecondaryDetails from './SecondaryDetails'
import { CardStyled, DividerStyled, RootWrapperStyled } from './styles'
import TaskDetailsTabs from './TaskDetailsTabs'
import {
  TaskDetailsTabsEnum,
  taskDetailsTabNames,
} from './TaskDetailsTabs/constants'
import DescriptionAndComments from './TaskDetailsTabs/DescriptionAndComments'
import Resolution from './TaskDetailsTabs/Resolution'

const { TabPane } = Tabs

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
  workGroupList: Array<WorkGroupModel>
  taskLoading: boolean
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
        await resolveTask({ taskId: details!.id, ...values })
        onTaskResolved()
      } catch (err) {
        notification.error({
          message: (err as any)?.data.detail,
          duration: ERROR_NOTIFICATION_DURATION,
        })
      }
    },
    [details, onTaskResolved, resolveTask],
  )

  const handleUpdateTaskWorkGroup = async (
    workGroup: WorkGroupModel['id'],
    closeTaskSecondLineModal: () => void,
  ) => {
    try {
      await updateTaskWorkGroup({ taskId: details!.id, workGroup })
      closeTaskSecondLineModal()
      onClose()
      refetchTaskList()
    } catch (error: any) {
      notification.error({
        message: error?.data.detail,
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
              defaultTabKey={TaskDetailsTabsEnum.DescriptionAndComments}
            >
              <TabPane
                tab={
                  taskDetailsTabNames[
                    TaskDetailsTabsEnum.DescriptionAndComments
                  ]
                }
                key={TaskDetailsTabsEnum.DescriptionAndComments}
              >
                <DescriptionAndComments
                  id={details.id}
                  description={details.description}
                />
              </TabPane>

              <TabPane
                tab={taskDetailsTabNames[TaskDetailsTabsEnum.Resolution]}
                key={TaskDetailsTabsEnum.Resolution}
              >
                <Resolution
                  type={details.type}
                  techResolution={details.techResolution}
                  userResolution={details.userResolution}
                />
              </TabPane>

              <TabPane
                tab={taskDetailsTabNames[TaskDetailsTabsEnum.Tasks]}
                key={TaskDetailsTabsEnum.Tasks}
              >
                Задания
              </TabPane>
            </TaskDetailsTabs>

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
