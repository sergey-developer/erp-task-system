import { Typography } from 'antd'

import styled from 'styled-components'

export const CommentHeaderTextStyled = styled(Typography.Text)`
  && {
    color: ${({ theme }) => theme.colors.gray3};
  }
`
