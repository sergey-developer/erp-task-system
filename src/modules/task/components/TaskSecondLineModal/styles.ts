import { Form } from 'antd'
import styled from 'styled-components'

export const WorkGroupFormItem = styled(Form.Item)`
  && {
    margin-bottom: 5px;
  }
`

export const OptionTextStyled = styled.span<{ $isBold: boolean }>`
  font-weight: normal;

  ${({ $isBold }) => ($isBold ? 'font-weight: 500;' : '')}
`
