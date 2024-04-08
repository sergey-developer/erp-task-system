import { MailTwoTone } from '@ant-design/icons'
import styled from 'styled-components'

import { fontSizeStyles } from './styles'
import { IconProps } from './types'

const MailIconStyled = styled(MailTwoTone)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default MailIconStyled
