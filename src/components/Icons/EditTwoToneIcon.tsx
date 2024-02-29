import { EditTwoTone } from '@ant-design/icons'
import styled from 'styled-components'

import { fontSizeStyles } from './styles'
import { IconProps } from './types'

const EditTwoToneIconStyled = styled(EditTwoTone)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default EditTwoToneIconStyled
