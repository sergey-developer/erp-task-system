import { Button, Dropdown, Menu, Row, Space, Typography } from 'antd'
import noop from 'lodash/noop'
import React, { FC } from 'react'

import {
  CheckCircleIcon,
  CloseIcon,
  MenuIcon,
  QuestionCircleIcon,
} from 'components/Icons'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import useTaskOlaStatus from 'modules/task/hooks/useTaskOlaStatus'
import useTaskStatus from 'modules/task/hooks/useTaskStatus'
import useTaskType from 'modules/task/hooks/useTaskType'
import useUserRole from 'modules/user/hooks/useUserRole'

type CardTitleProps = Pick<
  TaskDetailsModel,
  'id' | 'status' | 'olaStatus' | 'type'
> & {
  isAssignedToCurrentUser: boolean
  hasReclassificationRequest: boolean
  onClickExecuteTask: () => void
  onClickRequestReclassification: () => void
  onClose: () => void
}

const CardTitle: FC<CardTitleProps> = ({
  id,
  type,
  status,
  olaStatus,
  isAssignedToCurrentUser,
  hasReclassificationRequest,
  onClose,
  onClickExecuteTask,
  onClickRequestReclassification,
}) => {
  const taskType = useTaskType(type)
  const taskStatus = useTaskStatus(status)
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
            hasReclassificationRequest,
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
          label: hasReclassificationRequest
            ? 'Отменить переклассификацию'
            : 'Запросить переклассификацию',
          onClick: hasReclassificationRequest
            ? noop
            : onClickRequestReclassification,
        },
      ]}
    />
  )

  return (
    <Row justify='space-between' align='middle'>
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
