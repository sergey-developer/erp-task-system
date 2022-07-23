import { Typography } from 'antd'

import styled from 'styled-components'

const { Text } = Typography

export const HeaderTextStyled = styled(Text)`
  && {
    color: ${({ theme }) => theme.colors.gray3};
  }
`
