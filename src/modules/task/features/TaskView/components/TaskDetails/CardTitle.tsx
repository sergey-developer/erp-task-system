import {
  CheckCircleOutlined,
  CloseOutlined,
  QuestionCircleTwoTone,
} from '@ant-design/icons'
import { Button, Dropdown, Menu, Row, Space, Typography } from 'antd'
import noop from 'lodash/noop'
import React, { FC, useMemo } from 'react'

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

  const actionMenu = useMemo(() => {
    const items = []

    if (taskStatus.isInProgress) {
      items.push({
        key: 1,
        disabled: !isAssignedToCurrentUser || hasReclassificationRequest,
        icon: <CheckCircleOutlined className='fs-14' />,
        label: 'Выполнить заявку',
        onClick: onClickExecuteTask,
      })
    }

    if (!taskOlaStatus.isHalfExpired) {
      items.push({
        key: 2,
        disabled:
          !(
            (taskStatus.isNew || taskStatus.isAppointed) &&
            taskOlaStatus.isNotExpired
          ) ||
          taskType.isRequestTask ||
          taskType.isIncidentTask ||
          isEngineerRole,
        icon: <QuestionCircleTwoTone className='fs-14' />,
        label: hasReclassificationRequest
          ? 'Отменить переклассификацию'
          : 'Запросить переклассификацию',
        onClick: hasReclassificationRequest
          ? noop
          : onClickRequestReclassification,
      })
    }

    return <Menu items={items} />
  }, [
    isAssignedToCurrentUser,
    isEngineerRole,
    onClickExecuteTask,
    onClickRequestReclassification,
    hasReclassificationRequest,
    taskOlaStatus.isHalfExpired,
    taskOlaStatus.isNotExpired,
    taskStatus.isAppointed,
    taskStatus.isInProgress,
    taskStatus.isNew,
    taskType.isIncidentTask,
    taskType.isRequestTask,
  ])

  return (
    <Row justify='space-between' align='middle'>
      <Typography.Text>{id}</Typography.Text>

      <Space>
        <Dropdown.Button overlay={actionMenu} type='text' />

        <Button type='text' icon={<CloseOutlined />} onClick={onClose} />
      </Space>
    </Row>
  )
}

export default CardTitle
