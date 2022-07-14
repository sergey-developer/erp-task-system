import { Typography } from 'antd'

import styled from 'styled-components'

const { Text, Paragraph } = Typography

export const HeaderTextStyled = styled(Text)`
  && {
    color: ${({ theme }) => theme.colors.gray3};
  }
`

export const CommentText = styled(Paragraph)`
  && {
    margin-bottom: 0;
  }
`
