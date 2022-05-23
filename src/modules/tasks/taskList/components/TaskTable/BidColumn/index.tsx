import { Badge } from 'antd'
import React, { FC } from 'react'

import { iconOrBadgeStatusMap } from './constants'
import { BidColumnProps } from './interfaces'
import { WrapBadgeStyled } from './styles'

const BidColumn: FC<BidColumnProps> = ({ value, status: taskStatus }) => {
  const status = iconOrBadgeStatusMap[taskStatus]

  const isBadge = typeof status === 'string'

  return (
    <WrapBadgeStyled isBadge={isBadge}>
      {typeof status === 'string' ? <Badge status={status} /> : status}
      {value && <div>{value}</div>}
    </WrapBadgeStyled>
  )
}

export default BidColumn
