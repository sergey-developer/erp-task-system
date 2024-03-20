import { DeleteOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { colorStyles, cursorStyles } from './styles'
import { IconProps } from './types'

const DeleteIconStyled = styled(DeleteOutlined)<Pick<IconProps, '$cursor' | '$color'>>`
  ${cursorStyles}
  ${colorStyles}
`

export default DeleteIconStyled
