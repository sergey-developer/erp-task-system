import { RightCircleOutlined } from '@ant-design/icons'

import styled from 'styled-components'

import { IconProps } from './interfaces'
import { colorStyles } from './styles'

const RightCircleIcon = styled(RightCircleOutlined)<Pick<IconProps, '$color'>>`
  ${colorStyles}
`

export default RightCircleIcon
