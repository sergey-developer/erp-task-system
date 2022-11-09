import { SyncOutlined } from '@ant-design/icons'

import styled from 'styled-components'

import { IconProps } from './interfaces'
import { colorStyles } from './styles'

const SyncIcon = styled(SyncOutlined)<Pick<IconProps, '$color'>>`
  ${colorStyles}
`

export default SyncIcon
