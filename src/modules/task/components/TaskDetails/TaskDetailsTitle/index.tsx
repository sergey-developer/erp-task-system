import { Button, Dropdown, Row, Space, Typography } from 'antd'
import { MenuProps } from 'antd/es/menu'
import noop from 'lodash/noop'
import React, { FC } from 'react'

import { useIdBelongAuthUser } from 'modules/auth/hooks'
import {
  useTaskExtendedStatus,
  useTaskOlaStatus,
  useTaskStatus,
  useTaskType,
} from 'modules/task/hooks/task'
import { useTaskSuspendRequestStatus } from 'modules/task/hooks/taskSuspendRequest'
import { useMatchUserPermissions, useUserRole } from 'modules/user/hooks'

import {
  CheckCircleIcon,
  EditIcon,
  MenuIcon,
  PauseCircleIcon,
  QuestionCircleIcon,
  SyncIcon,
} from 'components/Icons'

import { MenuActionsKeysEnum, TaskDetailsTitleProps } from './types'

const { Text } = Typography

const TaskDetailsTitle: FC<TaskDetailsTitleProps> = ({
  id,
  type,
  status,
  workGroup,
  extendedStatus,
  olaStatus,
  suspendRequest,
  assignee,
  onReloadTask,
  onExecuteTask,
  onRequestSuspend,
  onRequestReclassification,
  onChangeDescription,
}) => {
  const taskType = useTaskType(type)

  const taskStatus = useTaskStatus(status)
  const taskExtendedStatus = useTaskExtendedStatus(extendedStatus)
  const taskOlaStatus = useTaskOlaStatus(olaStatus)

  const suspendRequestExist = !!suspendRequest
  const suspendRequestStatus = useTaskSuspendRequestStatus(suspendRequest?.status)

  const permissions = useMatchUserPermissions(['TASK_INTERNAL_DESCRIPTION_UPDATE'])
  const isAssignedToCurrentUser = useIdBelongAuthUser(assignee?.id)
  const { isEngineerRole, isFirstLineSupportRole } = useUserRole()

  const menuProps: MenuProps = {
    items: [
      {
        key: MenuActionsKeysEnum.RequestSuspend,
        disabled:
          (!taskStatus.isNew && !taskStatus.isInProgress) ||
          (!taskType.isIncident && !taskType.isRequest) ||
          (isFirstLineSupportRole && !!workGroup) ||
          suspendRequestExist,
        icon: <PauseCircleIcon $size='middle' />,
        label: 'Запросить перевод в ожидание',
        onClick: onRequestSuspend,
      },
      {
        key: MenuActionsKeysEnum.ExecuteTask,
        disabled: suspendRequestStatus.isApproved
          ? false
          : (isFirstLineSupportRole && !!workGroup) ||
            !taskStatus.isInProgress ||
            !isAssignedToCurrentUser ||
            taskExtendedStatus.isInReclassification ||
            suspendRequestStatus.isNew ||
            suspendRequestStatus.isInProgress,
        icon: <CheckCircleIcon $color='crayola' />,
        label: 'Выполнить заявку',
        onClick: onExecuteTask,
      },
      ...(taskExtendedStatus.isInReclassification
        ? [
            {
              key: MenuActionsKeysEnum.CancelReclassification,
              disabled: suspendRequestStatus.isApproved
                ? false
                : !(taskStatus.isNew && taskOlaStatus.isNotExpired) ||
                  taskOlaStatus.isHalfExpired ||
                  taskType.isRequestTask ||
                  taskType.isIncidentTask ||
                  isEngineerRole ||
                  suspendRequestStatus.isNew ||
                  suspendRequestStatus.isInProgress,
              icon: <QuestionCircleIcon />,
              label: 'Отменить переклассификацию',
              onClick: noop,
            },
          ]
        : [
            {
              key: MenuActionsKeysEnum.RequestReclassification,
              disabled:
                !(taskStatus.isNew && taskOlaStatus.isNotExpired) ||
                (isFirstLineSupportRole && !!workGroup) ||
                taskOlaStatus.isHalfExpired ||
                taskType.isRequestTask ||
                taskType.isIncidentTask ||
                isEngineerRole ||
                suspendRequestExist,
              icon: <QuestionCircleIcon />,
              label: 'Запросить переклассификацию',
              onClick: onRequestReclassification,
            },
          ]),
      {
        key: MenuActionsKeysEnum.ChangeDescription,
        disabled:
          !permissions?.taskInternalDescriptionUpdate ||
          (!taskType.isRequest && !taskType.isIncident),
        icon: <EditIcon />,
        label: 'Изменить описание',
        onClick: onChangeDescription,
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
