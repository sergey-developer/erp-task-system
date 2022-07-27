import { Divider } from 'antd'

import {
  StyledBreakpointStyles,
  StyledBreakpointsProps,
} from 'shared/interfaces/breakpoints'
import applyBreakpointStyles from 'shared/utils/breakpoints/applyBreakpointStyles'
import styled, { css } from 'styled-components'

export const DividerStyled = styled(Divider)`
  && {
    margin: 0;
  }
`

const wrapperBreakpointStyles: StyledBreakpointStyles = {
  xxl: css`
    padding: 30px 40px;
  `,
  xl: css`
    padding: 30px 15px;
  `,
}

export const Wrapper = styled.div<StyledBreakpointsProps>`
  ${({ $breakpoints }) =>
    applyBreakpointStyles($breakpoints, wrapperBreakpointStyles)}
`
