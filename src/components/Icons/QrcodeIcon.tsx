import { QrcodeOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { fontSizeStyles } from './styles'

const QrcodeIcon = styled(QrcodeOutlined)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default QrcodeIcon
