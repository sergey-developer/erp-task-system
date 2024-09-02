import { PlusCircleTwoTone } from '@ant-design/icons'
import styled from 'styled-components'

import { fontSizeStyles } from './styles'
import { IconProps } from './types'

const PlusIconStyled = styled(PlusCircleTwoTone)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default PlusIconStyled
