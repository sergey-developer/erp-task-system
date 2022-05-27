import { Badge } from 'antd'

import styled from 'styled-components'

export const BadgeStyled = styled(Badge).attrs({
  offset: [-2, 17],
})`
  margin-left: 20px;

  .ant-badge-dot {
    width: 12px;
    height: 12px;
  }
`
