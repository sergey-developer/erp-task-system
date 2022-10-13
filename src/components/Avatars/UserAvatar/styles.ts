import { Avatar, Badge } from 'antd'

import styled from 'styled-components'

export const BadgeStyled = styled(Badge).attrs({
  offset: [-2, 17],
})`
  .ant-badge-dot {
    width: 12px;
    height: 12px;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.white};
  }
`

export const AvatarStyled = styled(Avatar)`
  ${({ theme, src }) =>
    src ? '' : `background-color: ${theme.colors.bleuDeFrance};`}
`
