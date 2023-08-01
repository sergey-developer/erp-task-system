import { QuestionCircleTwoTone } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { fontSizeStyles } from './styles'

const QuestionCircleIcon = styled(QuestionCircleTwoTone)<
  Pick<IconProps, '$size'>
>`
  ${fontSizeStyles}
`

export default QuestionCircleIcon
