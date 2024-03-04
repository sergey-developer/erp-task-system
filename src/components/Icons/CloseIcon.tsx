import { CloseOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { colorStyles } from './styles'
import { IconProps } from './types'

const CloseIcon = styled(CloseOutlined)<Pick<IconProps, '$color'>>`
  ${colorStyles}
`

export default CloseIcon
