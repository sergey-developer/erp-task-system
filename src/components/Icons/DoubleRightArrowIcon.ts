import { DoubleRightOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { cursorStyles, fontSizeStyles } from './styles'
import { IconProps } from './types'

const DoubleRightArrowIconStyled = styled(DoubleRightOutlined)<
  Pick<IconProps, '$size' | '$cursor'>
>`
  ${cursorStyles}
  ${fontSizeStyles}
`

export default DoubleRightArrowIconStyled
