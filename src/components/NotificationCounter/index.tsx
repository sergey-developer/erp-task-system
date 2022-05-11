import { BellOutlined } from '@ant-design/icons'
import { Badge, BadgeProps } from 'antd'
import React, { FC } from 'react'

type NotificationCounterProps = Pick<BadgeProps, 'count'>

const NotificationCounter: FC<NotificationCounterProps> = ({ count }) => {
  return (
    <Badge size='small' count={count}>
      <BellOutlined className='font-s-18' />
    </Badge>
  )
}

export default NotificationCounter
