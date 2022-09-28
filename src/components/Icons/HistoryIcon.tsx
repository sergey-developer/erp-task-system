import { HistoryOutlined } from '@ant-design/icons'

import styled from 'styled-components'

import { IconProps } from './interfaces'
import { colorStyles } from './styles'

const HistoryIcon = styled(HistoryOutlined)<Pick<IconProps, '$color'>>`
  ${colorStyles}
`

export default HistoryIcon
