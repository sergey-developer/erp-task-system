import { EnvironmentOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { fontSizeStyles } from './styles'

const MapPointIconStyled = styled(EnvironmentOutlined)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default MapPointIconStyled
