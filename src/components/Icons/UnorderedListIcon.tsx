import { UnorderedListOutlined } from '@ant-design/icons'

import styled from 'styled-components'

import { IconProps } from './interfaces'
import { fontSizeStyles } from './styles'

const UnorderedListIcon = styled(UnorderedListOutlined)<
  Pick<IconProps, '$size'>
>`
  ${fontSizeStyles}
`

export default UnorderedListIcon
