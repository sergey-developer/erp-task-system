import { Col, Input, Row } from 'antd'
import styled, { css } from 'styled-components'

import {
  StyledBreakpointStyles,
  StyledBreakpointsProps,
} from 'shared/types/breakpoints'
import { applyBreakpointStyles } from 'shared/utils/breakpoints'

const { Search } = Input

export const RowStyled = styled(Row)`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

export const ColStyled = styled(Col)`
  height: 100%;
`

const searchBreakpointStyles: StyledBreakpointStyles = {
  xxl: css`
    width: 230px;
  `,
  xl: css`
    width: 310px;
  `,
}

export const SearchStyled = styled(Search)<StyledBreakpointsProps>`
  ${({ $breakpoints }) =>
    applyBreakpointStyles($breakpoints, searchBreakpointStyles)}
`
