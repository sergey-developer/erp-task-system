import { Typography } from 'antd'
import styled from 'styled-components'

export const PageTitleStyled = styled(Typography.Title)`
  && {
    color: ${({ theme }) => theme.colors.bleuDeFrance};
    text-align: center;
  }
`
