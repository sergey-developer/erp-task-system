import { MonitorOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './interfaces'
import { colorStyles, cursorStyles, fontSizeStyles } from './styles'

const MonitoringIcon = styled(MonitorOutlined)<
  Pick<IconProps, '$size' | '$cursor' | '$color'>
>`
  ${colorStyles}
  ${fontSizeStyles}
  ${cursorStyles}
`

export default MonitoringIcon
