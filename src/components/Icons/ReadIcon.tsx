import { ReadOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { fontSizeStyles } from './styles'
import { IconProps } from './types'

const ReadIcon = styled(ReadOutlined)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default ReadIcon
