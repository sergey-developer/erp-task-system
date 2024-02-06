import { Layout } from 'antd'
import styled from 'styled-components'

import { BaseLayoutContent, BaseLayoutContentProps } from '../BaseLayoutContent'

export const ContentStyled = styled(BaseLayoutContent)<BaseLayoutContentProps>`
  padding: 32px 50px;
`

export const FooterStyled = styled(Layout.Footer)`
  padding: 0 10px 10px 10px;
`
