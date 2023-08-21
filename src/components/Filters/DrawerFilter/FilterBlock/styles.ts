import styled, { css } from 'styled-components'

import {
  StyledBreakpointStyles,
  StyledBreakpointsProps,
} from 'shared/types/breakpoints'
import { applyBreakpointStyles } from 'shared/utils/breakpoints'

const wrapperBreakpointStyles: StyledBreakpointStyles = {
  xxl: css`
    padding: 30px 40px;
  `,
  xl: css`
    padding: 30px 15px;
  `,
}

export const WrapperStyled = styled.div<StyledBreakpointsProps>`
  &:not(:last-child) {
    border-bottom: ${({ theme }) => theme.colors.chineseWhite};
  }

  ${({ $breakpoints }) =>
    applyBreakpointStyles($breakpoints, wrapperBreakpointStyles)}
`
