import { LogoutOutlined } from '@ant-design/icons'

import styled from 'styled-components'

import { IconProps } from './interfaces'
import { fontSizeStyles } from './styles'

const LogoutIcon = styled(LogoutOutlined)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default LogoutIcon
