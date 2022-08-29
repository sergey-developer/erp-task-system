import { Card, Form, Typography } from 'antd'

import styled from 'styled-components'

export const CardStyled = styled(Card)`
  && {
    border-radius: 4px;
    padding: 80px 153px 100px 153px;
    ${({ theme }) => theme.shadows.shadow1}
  }

  .ant-card-body {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`

export const PageTitleStyled = styled(Typography.Title)`
  && {
    color: ${({ theme }) => theme.colors.bleuDeFrance};
    text-align: center;
  }
`

export const FormStyled: typeof Form = styled(Form)`
  width: 300px;
`
