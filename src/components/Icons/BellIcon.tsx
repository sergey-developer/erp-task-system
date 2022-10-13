import { BellOutlined } from '@ant-design/icons'

import styled from 'styled-components'

import { IconProps } from './interfaces'
import { fontSizeStyles } from './styles'

const BellIcon = styled(BellOutlined)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default BellIcon
