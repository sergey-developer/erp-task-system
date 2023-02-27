import { ToolOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './interfaces'
import { fontSizeStyles } from './styles'

const ToolIcon = styled(ToolOutlined)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default ToolIcon
