import { SyncOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { colorStyles } from './styles'

const SyncIconStyled = styled(SyncOutlined)<Pick<IconProps, '$color'>>`
  ${colorStyles}
`

export default SyncIconStyled
