import {
  CheckCircleOutlined,
  CloseOutlined,
  QuestionCircleTwoTone,
} from '@ant-design/icons'
import { Button, Dropdown, Menu, Row, Space, Typography } from 'antd'
import _noop from 'lodash/noop'
import React, { FC, useMemo } from 'react'

import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import useTaskOlaStatus from 'modules/task/hooks/useTaskOlaStatus'
import useTaskStatus from 'modules/task/hooks/useTaskStatus'
import useUserRole from 'modules/user/hooks/useUserRole'

type CardTitleProps = Pick<TaskDetailsModel, 'id' | 'status' | 'olaStatus'> & {
  isAssignedToCurrentUser: boolean
  reclassificationRequestExist: boolean
  onClickExecuteTask: () => void
  onClickRequestReclassification: () => void
  onClose: () => void
}

const CardTitle: FC<CardTitleProps> = ({
  id,
  onClose,
  onClickExecuteTask,
  onClickRequestReclassification,
  isAssignedToCurrentUser,
  status,
  olaStatus,
  reclassificationRequestExist,
}) => {
  const taskStatus = useTaskStatus(status)
  const taskOlaStatus = useTaskOlaStatus(olaStatus)
  const { isEngineerRole } = useUserRole()

  const actionMenu = useMemo(() => {
    const items = []

    if (taskStatus.isInProgress) {
      items.push({
        key: 1,
        disabled: !isAssignedToCurrentUser || reclassificationRequestExist,
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
          ) || isEngineerRole,
        icon: <QuestionCircleTwoTone className='fs-14' />,
        label: reclassificationRequestExist
          ? 'Отменить переклассификацию'
          : 'Запросить переклассификацию',
        onClick: reclassificationRequestExist
          ? _noop
          : onClickRequestReclassification,
      })
    }

    return <Menu items={items} />
  }, [
    isAssignedToCurrentUser,
    isEngineerRole,
    onClickExecuteTask,
    onClickRequestReclassification,
    reclassificationRequestExist,
    taskOlaStatus.isHalfExpired,
    taskOlaStatus.isNotExpired,
    taskStatus.isAppointed,
    taskStatus.isInProgress,
    taskStatus.isNew,
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
