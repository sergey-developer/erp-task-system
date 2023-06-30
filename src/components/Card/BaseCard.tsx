import { Card } from 'antd'
import styled from 'styled-components'

export const BaseCard = styled(Card)`
  && {
    width: 600px;
    border-radius: 4px;
    padding: 80px 153px 100px 153px;
    ${({ theme }) => theme.shadows.shadow1}
  }

  .ant-card-body {
    display: flex;
    flex-direction: column;
    padding: 0;

    .ant-form {
      width: 300px;
    }
  }
`
