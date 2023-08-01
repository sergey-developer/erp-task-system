import { LogoutOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { fontSizeStyles } from './styles'

const LogoutIconStyled = styled(LogoutOutlined)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default LogoutIconStyled
