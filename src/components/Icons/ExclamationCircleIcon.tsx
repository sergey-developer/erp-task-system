import { ExclamationCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { colorStyles, cursorStyles, fontSizeStyles } from './styles'
import { IconProps } from './types'

const ExclamationCircleIconStyled = styled(ExclamationCircleOutlined)<
  Pick<IconProps, '$color' | '$size' | '$cursor'>
>`
  ${colorStyles}
  ${fontSizeStyles}
  ${cursorStyles}
`

export default ExclamationCircleIconStyled
