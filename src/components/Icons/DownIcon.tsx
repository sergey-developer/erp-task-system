import { DownOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { colorStyles, fontSizeStyles } from './styles'

const DownIconStyled = styled(DownOutlined)<Pick<IconProps, '$size' | '$color'>>`
  ${fontSizeStyles}
  ${colorStyles}
`

export default DownIconStyled
