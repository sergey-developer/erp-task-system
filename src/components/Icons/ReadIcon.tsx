import { ReadOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './interfaces'
import { fontSizeStyles } from './styles'

const ReadIcon = styled(ReadOutlined)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default ReadIcon
