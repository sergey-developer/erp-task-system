import { Typography } from 'antd'
import {
  fiscalAccumulatorFormatColorDict,
  FiscalAccumulatorFormatEnum,
} from 'features/reports/api/constants'
import styled from 'styled-components'

import { MaybeNull } from 'shared/types/utils'

const { Text } = Typography

export const OlaNextBreachTimeStyled = styled(Text)<{
  $faFormat: MaybeNull<FiscalAccumulatorFormatEnum>
}>`
  ${({ $faFormat }) => ($faFormat ? `color: ${fiscalAccumulatorFormatColorDict[$faFormat]};` : '')}
`

export const BodyCellStyled = styled('td')<{ $bgColor?: string }>`
  &&&& {
    ${({ $bgColor }) => ($bgColor ? `background-color: ${$bgColor}4d;` : '')}
  }
`
