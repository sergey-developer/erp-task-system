import { DownOutlined } from '@ant-design/icons'

import styled from 'styled-components'

import { IconProps } from './interfaces'
import { colorStyles, fontSizeStyles } from './styles'

const DownIcon = styled(DownOutlined)<Pick<IconProps, '$size' | '$color'>>`
  ${fontSizeStyles}
  ${colorStyles}
`

export default DownIcon
