import { Layout } from 'antd'
import styled from 'styled-components'

import { LAYOUT_CONTENT_PADDING_V } from 'shared/constants/common'

import { BaseLayoutContent, BaseLayoutContentProps } from '../BaseLayoutContent'

export const ContentStyled = styled(BaseLayoutContent)<BaseLayoutContentProps>`
  padding: ${LAYOUT_CONTENT_PADDING_V}px 50px;
`

export const FooterStyled = styled(Layout.Footer)`
  padding: 0 10px 10px 10px;
`
