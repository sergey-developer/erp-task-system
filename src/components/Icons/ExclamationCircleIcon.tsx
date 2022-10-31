import { ExclamationCircleOutlined } from '@ant-design/icons'

import styled from 'styled-components'

import { IconProps } from './interfaces'
import { colorStyles } from './styles'

const ExclamationCircleIcon = styled(ExclamationCircleOutlined)<
  Pick<IconProps, '$color'>
>`
  ${colorStyles}
`

export default ExclamationCircleIcon
