import { Badge } from 'antd'

import styled from 'styled-components'

export const BadgeStyled = styled(Badge).attrs({
  offset: [-2, 17],
})`
  .ant-badge-dot {
    width: 12px;
    height: 12px;
  }
`
