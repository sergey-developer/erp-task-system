import { Button, Dropdown, Menu, Row, Space, Typography } from 'antd'
import noop from 'lodash/noop'
import React, { FC } from 'react'

import {
  CheckCircleIcon,
  CloseIcon,
  MenuIcon,
  PauseCircleIcon,
  QuestionCircleIcon,
  SyncIcon,
} from 'components/Icons'
import {
  useTaskExtendedStatus,
  useTaskOlaStatus,
  useTaskStatus,
  useTaskSuspendRequestStatus,
  useTaskType,
} from 'modules/task/hooks'
import { TaskModel } from 'modules/task/models'
import { useUserRole } from 'modules/user/hooks'

export type CardTitleProps = Pick<
  TaskModel,
  'id' | 'status' | 'extendedStatus' | 'olaStatus' | 'type'
> & {
  suspendRequest: TaskModel['suspendRequest']
  isAssignedToCurrentUser: boolean

  onReloadTask: () => void
  onExecuteTask: () => void
  onRequestSuspend: () => void
  onRequestReclassification: () => void
  onClose: () => void
}

const CardTitle: FC<CardTitleProps> = ({
  id,
  type,
  status,
  extendedStatus,
  olaStatus,
  isAssignedToCurrentUser,
  suspendRequest,
  onClose,
  onReloadTask,
  onExecuteTask,
  onRequestSuspend,
  onRequestReclassification,
}) => {
  const taskType = useTaskType(type)
  const taskStatus = useTaskStatus(status)
  const taskExtendedStatus = useTaskExtendedStatus(extendedStatus)
  const taskOlaStatus = useTaskOlaStatus(olaStatus)
  const { isEngineerRole } = useUserRole()
  const suspendRequestStatus = useTaskSuspendRequestStatus(
    suspendRequest?.status,
  )

  const suspendRequestExist = !!suspendRequest

  const actionMenu = (
    <Menu
      items={[
        {
          key: 1,
          disabled:
            (!taskStatus.isNew && !taskStatus.isInProgress) ||
            (!taskType.isIncident && !taskType.isRequest) ||
            suspendRequestExist,
          icon: <PauseCircleIcon $size='middle' />,
          label: 'Запросить перевод в ожидание',
          onClick: onRequestSuspend,
        },
        {
          key: 2,
          disabled: suspendRequestStatus.isApproved
            ? false
            : !taskStatus.isInProgress ||
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
                key: 3,
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
                key: 3,
                disabled:
                  !(taskStatus.isNew && taskOlaStatus.isNotExpired) ||
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
      ]}
    />
  )

  return (
    <Row data-testid='task-card-title' justify='space-between' align='middle'>
      <Typography.Text>{id}</Typography.Text>

      <Space size='middle'>
        <Button type='text' icon={<SyncIcon />} onClick={onReloadTask} />

        <Dropdown overlay={actionMenu}>
          <Button type='text' icon={<MenuIcon />} />
        </Dropdown>

        <Button type='text' icon={<CloseIcon />} onClick={onClose} />
      </Space>
    </Row>
  )
}

export default CardTitle
