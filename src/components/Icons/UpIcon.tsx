import { UpOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { colorStyles, fontSizeStyles } from './styles'

const UpIcon = styled(UpOutlined)<Pick<IconProps, '$size' | '$color'>>`
  ${fontSizeStyles}
  ${colorStyles}
`

export default UpIcon
