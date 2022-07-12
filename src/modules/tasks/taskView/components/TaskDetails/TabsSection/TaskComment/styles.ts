import { Typography } from 'antd'

import styled from 'styled-components'

export const HeaderTextStyled = styled(Typography.Text)`
  && {
    color: ${({ theme }) => theme.colors.gray3};
  }
`
