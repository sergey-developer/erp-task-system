import { UnorderedListOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { fontSizeStyles } from './styles'

const UnorderedListIconStyled = styled(UnorderedListOutlined)<
  Pick<IconProps, '$size'>
>`
  ${fontSizeStyles}
`

export default UnorderedListIconStyled
