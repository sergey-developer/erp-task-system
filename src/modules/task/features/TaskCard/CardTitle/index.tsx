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
  useTaskType,
} from 'modules/task/hooks'
import { TaskModel } from 'modules/task/models'
import { useUserRole } from 'modules/user/hooks'

export type CardTitleProps = Pick<
  TaskModel,
  'id' | 'status' | 'extendedStatus' | 'olaStatus' | 'type'
> & {
  isAssignedToCurrentUser: boolean
  hasSuspendRequest: boolean
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
  hasSuspendRequest,
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

  const actionMenu = (
    <Menu
      items={[
        {
          key: 1,
          disabled:
            (!taskStatus.isNew && !taskStatus.isInProgress) ||
            (!taskType.isIncident && !taskType.isRequest) ||
            hasSuspendRequest,
          icon: <PauseCircleIcon $size='middle' />,
          label: 'Запросить перевод в ожидание',
          onClick: onRequestSuspend,
        },
        {
          key: 2,
          disabled:
            !taskStatus.isInProgress ||
            !isAssignedToCurrentUser ||
            taskExtendedStatus.isInReclassification ||
            hasSuspendRequest,
          icon: <CheckCircleIcon $color='crayola' />,
          label: 'Выполнить заявку',
          onClick: onExecuteTask,
        },
        {
          key: 3,
          disabled:
            !(taskStatus.isNew && taskOlaStatus.isNotExpired) ||
            taskOlaStatus.isHalfExpired ||
            taskType.isRequestTask ||
            taskType.isIncidentTask ||
            isEngineerRole ||
            hasSuspendRequest,
          icon: <QuestionCircleIcon />,
          label: taskExtendedStatus.isInReclassification
            ? 'Отменить переклассификацию'
            : 'Запросить переклассификацию',
          onClick: taskExtendedStatus.isInReclassification
            ? noop
            : onRequestReclassification,
        },
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
