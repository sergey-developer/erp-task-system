import { FieldTimeOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { colorStyles, fontSizeStyles } from './styles'
import { IconProps } from './types'

const FieldTimeIconStyled = styled(FieldTimeOutlined)<Pick<IconProps, '$color' | '$size'>>`
  ${colorStyles}
  ${fontSizeStyles}
`

export default FieldTimeIconStyled
