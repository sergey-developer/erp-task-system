import { Layout, Select } from 'antd'
import styled, { css } from 'styled-components'

import {
  StyledBreakpointStyles,
  StyledBreakpointsProps,
} from 'shared/interfaces/breakpoints'
import { applyBreakpointStyles } from 'shared/utils/breakpoints'

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

export const TimeZoneSelectStyled = styled(Select)`
  width: 150px;
`
