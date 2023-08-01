import { TeamOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { fontSizeStyles } from './styles'

const TeamIconStyled = styled(TeamOutlined)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default TeamIconStyled
