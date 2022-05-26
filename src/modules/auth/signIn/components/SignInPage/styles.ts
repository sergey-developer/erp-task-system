import { Card, Form, Typography } from 'antd'

import styled from 'styled-components'

export const CardStyled = styled(Card)`
  && {
    ${({ theme }) => theme.shadows.shadow1}
    border-radius: 4px;
    padding: 54px 130px;
  }
`

export const PageTitleStyled = styled(Typography.Title)`
  && {
    color: ${(props) => props.theme.colors.blue1};
    text-align: center;
    margin-bottom: 48px;
  }
`

export const FormTitleStyled = styled(Typography.Title)`
  && {
    margin-top: 24px;
  }
`

export const FormStyled: typeof Form = styled(Form)`
  margin-top: 24px;
  min-width: 300px;
`
