import { Button, Dropdown, Row, Space, Typography } from 'antd'
import { MenuProps } from 'antd/es/menu'
import { useIdBelongAuthUser } from 'features/auth/hooks'
import {
  useTaskExtendedStatus,
  useTaskOlaStatus,
  useTaskStatus,
  useTaskSuspendRequestStatus,
  useTaskType,
} from 'features/tasks/hooks'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { useUserPermissions } from 'features/users/hooks'
import React, { FC } from 'react'

import {
  CheckCircleIcon,
  EditTwoToneIcon,
  FieldTimeIcon,
  MailIcon,
  MenuIcon,
  PauseCircleIcon,
  PlusIcon,
  QuestionCircleIcon,
  SyncIcon,
} from 'components/Icons'

import { SystemEnum } from 'shared/constants/enums'

import { MenuActionsKeysEnum, TaskDetailsTitleProps } from './types'

const { Text } = Typography

const TaskDetailsTitle: FC<TaskDetailsTitleProps> = ({
  userActions,

  id,
  type,
  status,
  workGroup,
  extendedStatus,
  olaStatus,
  suspendRequest,
  assignee,
  system,

  onReloadTask,
  onExecuteTask,
  onRegisterFN,
  onRequestSuspend,
  onRequestReclassification,
  onUpdateDescription,
  onUpdateDeadline,
  onCreateInternalTask,
}) => {
  const taskType = useTaskType(type)

  const taskStatus = useTaskStatus(status)
  const taskExtendedStatus = useTaskExtendedStatus(extendedStatus)
  const taskOlaStatus = useTaskOlaStatus(olaStatus)

  const suspendRequestStatus = useTaskSuspendRequestStatus(suspendRequest?.status)

  const permissions = useUserPermissions([
    UserPermissionsEnum.TaskInternalDescriptionUpdate,
    UserPermissionsEnum.TaskInternalDeadlineUpdate,
    UserPermissionsEnum.InternalTasksCreate,
  ])

  const assigneeIsCurrentUser = useIdBelongAuthUser(assignee?.id)
  const hasWorkGroup = !!workGroup

  const menuProps: MenuProps = {
    items: [
      {
        key: MenuActionsKeysEnum.RequestSuspend,
        disabled: suspendRequestStatus.isApproved
          ? false
          : (!taskStatus.isNew && !taskStatus.isInProgress) ||
            (!taskType.isIncident && !taskType.isRequest) ||
            taskExtendedStatus.isInReclassification ||
            suspendRequestStatus.isNew ||
            suspendRequestStatus.isInProgress ||
            !userActions.tasks.CAN_SUSPEND_REQUESTS_CREATE?.includes(id),
        icon: <PauseCircleIcon $size='middle' />,
        label: 'Запросить перевод в ожидание',
        onClick: onRequestSuspend,
      },
      {
        key: MenuActionsKeysEnum.RegisterFN,
        disabled: !(
          (taskType.isIncident || taskType.isRequest) &&
          taskStatus.isInProgress &&
          assigneeIsCurrentUser &&
          hasWorkGroup
        ),
        icon: <MailIcon />,
        label: 'Зарегистрировать ФН',
        onClick: onRegisterFN,
      },
      {
        key: MenuActionsKeysEnum.CreateInternalTask,
        disabled: !(
          (taskType.isIncident || taskType.isRequest) &&
          system !== SystemEnum.ITSM &&
          permissions.internalTasksCreate &&
          userActions.tasks.CAN_READ?.includes(id)
        ),
        icon: <PlusIcon />,
        label: 'Создать внутреннюю заявку',
        onClick: onCreateInternalTask,
      },
      {
        key: MenuActionsKeysEnum.ExecuteTask,
        disabled: !userActions.tasks.CAN_RESOLVE?.includes(id),
        icon: <CheckCircleIcon $color='crayola' />,
        label: 'Выполнить заявку',
        onClick: onExecuteTask,
      },
      ...(!taskExtendedStatus.isInReclassification
        ? [
            {
              key: MenuActionsKeysEnum.RequestReclassification,
              disabled:
                !taskOlaStatus.isNotExpired ||
                taskType.isRequestTask ||
                taskType.isIncidentTask ||
                suspendRequestStatus.isNew ||
                suspendRequestStatus.isInProgress ||
                !userActions.tasks.CAN_RECLASSIFICATION_REQUESTS_CREATE?.includes(id),
              icon: <QuestionCircleIcon />,
              label: 'Запросить переклассификацию',
              onClick: onRequestReclassification,
            },
          ]
        : []),
      {
        key: MenuActionsKeysEnum.UpdateDescription,
        disabled:
          !permissions.taskInternalDescriptionUpdate ||
          (!taskType.isRequest && !taskType.isIncident),
        icon: <EditTwoToneIcon />,
        label: 'Изменить описание',
        onClick: onUpdateDescription,
      },
      {
        key: MenuActionsKeysEnum.UpdateDeadline,
        disabled:
          !permissions.taskInternalDeadlineUpdate || (!taskType.isRequest && !taskType.isIncident),
        icon: <FieldTimeIcon $color='royalOrange' />,
        label: 'Изменить внутренний срок выполнения',
        onClick: onUpdateDeadline,
      },
    ],
  }

  return (
    <Row data-testid='task-details-title' justify='space-between' align='middle'>
      <Text>{id}</Text>

      <Space size='middle'>
        <Button type='text' icon={<SyncIcon />} onClick={onReloadTask} />

        <Dropdown menu={menuProps}>
          <Button type='text' icon={<MenuIcon />} />
        </Dropdown>
      </Space>
    </Row>
  )
}

export default TaskDetailsTitle
