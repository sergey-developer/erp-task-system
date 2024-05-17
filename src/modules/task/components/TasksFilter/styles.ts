import { Checkbox } from 'antd'
import styled from 'styled-components'

export const CheckboxGroupStyled = styled(Checkbox.Group)`
  && {
    display: flex;
    flex-direction: column;

    & .ant-checkbox-group-item {
      align-items: center;
      width: max-content;
    }

    & .ant-checkbox-group-item:not(:nth-last-child(1)) {
      margin-bottom: 20px;
    }

    & .ant-checkbox {
      top: 0;
    }
  }
`
