import { Select } from 'antd'

import styled from 'styled-components'

export const SelectStyled = styled(Select)`
  &&& {
    width: 55%;
  }
`

export const OptionTextStyled = styled.span<{ $isBold: boolean }>`
  ${({ $isBold }) => ($isBold ? 'font-weight: 500;' : '')}
`
