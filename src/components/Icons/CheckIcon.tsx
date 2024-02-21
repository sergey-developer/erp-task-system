import { CheckOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { colorStyles, cursorStyles } from './styles'
import { IconProps } from './types'

const CheckIconStyled = styled(CheckOutlined)<Pick<IconProps, '$color' | '$cursor'>>`
  ${colorStyles}
  ${cursorStyles}
`

export default CheckIconStyled
