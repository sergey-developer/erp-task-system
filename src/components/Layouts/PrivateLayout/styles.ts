import { Layout } from 'antd'
import styled, { css } from 'styled-components'

import {
  StyledBreakpointStyles,
  StyledBreakpointsProps,
} from 'shared/interfaces/breakpoints'
import { applyBreakpointStyles } from 'shared/utils/breakpoints'

import { BaseLayoutContent, BaseLayoutContentProps } from '../BaseLayoutContent'

const contentBreakpointStyles: StyledBreakpointStyles = {
  xxl: css`
    padding: 32px 40px;
  `,
  xl: css`
    padding: 32px 15px;
  `,
}

export const ContentStyled = styled(BaseLayoutContent)<
  StyledBreakpointsProps & BaseLayoutContentProps
>`
  ${({ $breakpoints }) =>
    applyBreakpointStyles($breakpoints, contentBreakpointStyles)}

  min-height: calc(100vh - 60px);
`

export const FooterStyled = styled(Layout.Footer)`
  padding: 0 10px 10px 10px;
`
