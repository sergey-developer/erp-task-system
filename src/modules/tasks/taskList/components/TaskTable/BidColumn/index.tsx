import { Badge, Space } from 'antd'
import React, { FC } from 'react'

import { TaskStatusEnum } from 'modules/tasks/models'

import { iconOrBadgeStatusMap } from './constants'

type BidColumnProps = {
  value: string
  status: TaskStatusEnum
}

const BidColumn: FC<BidColumnProps> = ({ value, status: taskStatus }) => {
  const status = iconOrBadgeStatusMap[taskStatus]

  return typeof status === 'string' ? (
    <Badge status={status} text={value} />
  ) : (
    <Space>
      {status}
      {value}
    </Space>
  )
}

export default BidColumn
