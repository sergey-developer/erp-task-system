import { UpOutlined } from '@ant-design/icons'

import styled from 'styled-components'

import { IconProps } from './interfaces'
import { fontSizeStyles } from './styles'

const UpIcon = styled(UpOutlined)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default UpIcon
