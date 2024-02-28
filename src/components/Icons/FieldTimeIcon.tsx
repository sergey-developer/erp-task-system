import { FieldTimeOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { colorStyles } from './styles'
import { IconProps } from './types'

const FieldTimeIconStyled = styled(FieldTimeOutlined)<Pick<IconProps, '$color'>>`
  ${colorStyles}
`

export default FieldTimeIconStyled
