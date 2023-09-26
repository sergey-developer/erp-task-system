import { Layout } from 'antd'
import styled from 'styled-components'

import { StyledBreakpointsProps } from 'shared/types/breakpoints'

import { BaseLayoutContent, BaseLayoutContentProps } from '../BaseLayoutContent'

// const contentBreakpointStyles: StyledBreakpointStyles = {
//   xxl: css`
//     padding: 32px 40px;
//   `,
//   xl: css`
//     padding: 32px 15px;
//   `,
// }

export const ContentStyled = styled(BaseLayoutContent)<
  StyledBreakpointsProps & BaseLayoutContentProps
>`
  min-height: calc(100vh - 60px);
`

export const FooterStyled = styled(Layout.Footer)`
  padding: 0 10px 10px 10px;
`
