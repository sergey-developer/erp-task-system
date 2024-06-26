import { ExclamationCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { colorStyles, fontSizeStyles } from './styles'
import { IconProps } from './types'

const ExclamationCircleIconStyled = styled(ExclamationCircleOutlined)<
  Pick<IconProps, '$color' | '$size'>
>`
  ${colorStyles}
  ${fontSizeStyles}
`

export default ExclamationCircleIconStyled
