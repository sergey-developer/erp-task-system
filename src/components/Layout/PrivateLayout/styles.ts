import { Layout } from 'antd'
import styled, { css } from 'styled-components'

import {
  StyledBreakpointStyles,
  StyledBreakpointsProps,
} from 'shared/interfaces/breakpoints'
import { applyBreakpointStyles } from 'shared/utils/breakpoints'

const contentBreakpointStyles: StyledBreakpointStyles = {
  xxl: css`
    padding: 32px 40px;
  `,
  xl: css`
    padding: 32px 15px;
  `,
}

export const ContentStyled = styled(Layout.Content)<StyledBreakpointsProps>`
  ${({ $breakpoints }) =>
    applyBreakpointStyles($breakpoints, contentBreakpointStyles)}

  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  flex-flow: column;
`

export const FooterStyled = styled(Layout.Footer)`
  padding: 0 10px 10px 10px;
`
