import { DownloadOutlined } from '@ant-design/icons'

import styled from 'styled-components'

import { IconProps } from './interfaces'
import { colorStyles } from './styles'

const DownloadIcon = styled(DownloadOutlined)<Pick<IconProps, '$color'>>`
  ${colorStyles}
`

export default DownloadIcon
