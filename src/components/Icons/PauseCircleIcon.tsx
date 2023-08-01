import { PauseCircleTwoTone } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { fontSizeStyles } from './styles'

const PauseCircleIcon = styled(PauseCircleTwoTone)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default PauseCircleIcon
