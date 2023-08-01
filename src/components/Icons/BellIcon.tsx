import { BellOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { cursorStyles, fontSizeStyles } from './styles'

const BellIcon = styled(BellOutlined)<Pick<IconProps, '$size' | '$cursor'>>`
  ${fontSizeStyles}
  ${cursorStyles}
`

export default BellIcon
