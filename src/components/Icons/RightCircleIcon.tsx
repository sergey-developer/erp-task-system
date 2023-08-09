import { RightCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { colorStyles } from './styles'

const RightCircleIconStyled = styled(RightCircleOutlined)<Pick<IconProps, '$color'>>`
  ${colorStyles}
`

export default RightCircleIconStyled
