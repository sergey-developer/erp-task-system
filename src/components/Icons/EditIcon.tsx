import { EditOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { colorStyles, cursorStyles, fontSizeStyles } from './styles'
import { IconProps } from './types'

const EditIconStyled = styled(EditOutlined)<Pick<IconProps, '$size' | '$cursor' | '$color'>>`
  ${fontSizeStyles}
  ${cursorStyles}
  ${colorStyles}
`

export default EditIconStyled
