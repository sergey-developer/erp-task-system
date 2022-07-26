import { Layout } from 'antd'

import {
  StyledBreakpointStyles,
  StyledBreakpointsProps,
} from 'shared/interfaces/breakpoints'
import applyBreakpointStyles from 'shared/utils/breakpoints/applyBreakpointStyles'
import styled, { css } from 'styled-components'

const { Header } = Layout

const headerBreakpointStyles: StyledBreakpointStyles = {
  xxl: css`
    padding: 0 40px;
  `,
  xl: css`
    padding: 0 15px;
  `,
}

export const HeaderStyled = styled(Header)<StyledBreakpointsProps>`
  ${({ $breakpoints }) =>
    applyBreakpointStyles($breakpoints, headerBreakpointStyles)}
`
