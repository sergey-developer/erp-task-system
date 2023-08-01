import { MonitorOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { colorStyles, cursorStyles, fontSizeStyles } from './styles'

const MonitoringIconStyled = styled(MonitorOutlined)<
  Pick<IconProps, '$size' | '$cursor' | '$color'>
>`
  ${colorStyles}
  ${fontSizeStyles}
  ${cursorStyles}
`

export default MonitoringIconStyled
