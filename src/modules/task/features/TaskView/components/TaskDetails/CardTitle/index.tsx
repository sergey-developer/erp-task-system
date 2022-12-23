import { Button, Dropdown, Menu, Row, Space, Typography } from 'antd'
import noop from 'lodash/noop'
import React, { FC } from 'react'

import {
  CheckCircleIcon,
  CloseIcon,
  MenuIcon,
  QuestionCircleIcon,
} from 'components/Icons'
import {
  useTaskExtendedStatus,
  useTaskOlaStatus,
  useTaskStatus,
  useTaskType,
} from 'modules/task/hooks'
import { TaskDetailsModel } from 'modules/task/models'
import useUserRole from 'modules/user/hooks/useUserRole'

export type CardTitleProps = Pick<
  TaskDetailsModel,
  'id' | 'status' | 'extendedStatus' | 'olaStatus' | 'type'
> & {
  isAssignedToCurrentUser: boolean
  onClickExecuteTask: () => void
  onClickRequestReclassification: () => void
  onClose: () => void
}

const CardTitle: FC<CardTitleProps> = ({
  id,
  type,
  status,
  extendedStatus,
  olaStatus,
  isAssignedToCurrentUser,
  onClose,
  onClickExecuteTask,
  onClickRequestReclassification,
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
            !taskStatus.isInProgress ||
            !isAssignedToCurrentUser ||
            taskExtendedStatus.isInReclassification,
          icon: <CheckCircleIcon $color='crayola' />,
          label: 'Выполнить заявку',
          onClick: onClickExecuteTask,
        },
        {
          key: 2,
          disabled:
            !(taskStatus.isNew && taskOlaStatus.isNotExpired) ||
            taskOlaStatus.isHalfExpired ||
            taskType.isRequestTask ||
            taskType.isIncidentTask ||
            isEngineerRole,
          icon: <QuestionCircleIcon />,
          label: taskExtendedStatus.isInReclassification
            ? 'Отменить переклассификацию'
            : 'Запросить переклассификацию',
          onClick: taskExtendedStatus.isInReclassification
            ? noop
            : onClickRequestReclassification,
        },
      ]}
    />
  )

  return (
    <Row
      data-testid='task-details-card-title'
      justify='space-between'
      align='middle'
    >
      <Typography.Text>{id}</Typography.Text>

      <Space>
        <Dropdown overlay={actionMenu}>
          <Button type='text' icon={<MenuIcon />} />
        </Dropdown>

        <Button type='text' icon={<CloseIcon />} onClick={onClose} />
      </Space>
    </Row>
  )
}

export default CardTitle
