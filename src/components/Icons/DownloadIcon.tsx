import { DownloadOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { colorStyles } from './styles'

const DownloadIconStyled = styled(DownloadOutlined)<Pick<IconProps, '$color'>>`
  ${colorStyles}
`

export default DownloadIconStyled
