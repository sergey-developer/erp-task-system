import { CheckCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { colorStyles, fontSizeStyles } from './styles'

const CheckCircleIcon = styled(CheckCircleOutlined)<IconProps>`
  ${colorStyles}
  ${fontSizeStyles}
`

export default CheckCircleIcon
