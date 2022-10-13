import { Col, Input, Row } from 'antd'

import {
  StyledBreakpointStyles,
  StyledBreakpointsProps,
} from 'shared/interfaces/breakpoints'
import applyBreakpointStyles from 'shared/utils/breakpoints/applyBreakpointStyles'
import styled, { css } from 'styled-components'

const { Search } = Input

export const ColFlexStyled = styled(Col)`
  display: flex;
  flex-direction: column;
`

export const RowStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`

export const RowWrapStyled = styled(Row)`
  flex-direction: column;
  flex-flow: column;
  flex: 1;
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
