import { EditOutlined } from "@ant-design/icons";
import styled from 'styled-components'

import { IconProps } from './types'
import { fontSizeStyles } from './styles'

const EditIconStyled = styled(EditOutlined)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default EditIconStyled
