import { CheckCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { colorStyles, fontSizeStyles } from './styles'
import { IconProps } from './types'

const CheckCircleIconStyled = styled(CheckCircleOutlined)<Pick<IconProps, '$color' | '$size'>>`
  ${colorStyles}
  ${fontSizeStyles}
`

export default CheckCircleIconStyled
