import { Badge, BadgeProps } from 'antd'
import React, { FC } from 'react'

import { BellIcon } from 'components/Icons'

type NotificationCounterProps = Pick<BadgeProps, 'count'>

const NotificationCounter: FC<NotificationCounterProps> = ({ count }) => {
  return (
    <Badge size='small' count={count}>
      <BellIcon $size='large' />
    </Badge>
  )
}

export default NotificationCounter
