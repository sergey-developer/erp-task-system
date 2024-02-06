import { DeleteOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { cursorStyles } from './styles'
import { IconProps } from './types'

const DeleteIconStyled = styled(DeleteOutlined)<Pick<IconProps, '$cursor'>>`
  ${cursorStyles}
`

export default DeleteIconStyled
