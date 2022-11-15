import { Badge } from 'antd'

import styled from 'styled-components'

export const BadgeStyled: typeof Badge = styled(Badge)`
  & .ant-badge-status-text {
    display: none;
  }
`
