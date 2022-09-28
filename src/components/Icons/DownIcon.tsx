import { DownOutlined } from '@ant-design/icons'

import styled from 'styled-components'

import { IconProps } from './interfaces'
import { fontSizeStyles } from './styles'

const DownIcon = styled(DownOutlined)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default DownIcon
