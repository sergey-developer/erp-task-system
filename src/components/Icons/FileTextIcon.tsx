import { FileTextOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { fontSizeStyles } from './styles'
import { IconProps } from './types'

const FileTextIconStyled = styled(FileTextOutlined)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default FileTextIconStyled
