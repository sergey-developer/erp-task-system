import { Drawer } from 'antd'
import styled, { css } from 'styled-components'

import {
  StyledBreakpointStyles,
  StyledBreakpointsProps,
} from 'shared/interfaces/breakpoints'
import { applyBreakpointStyles } from 'shared/utils/breakpoints'

const drawerBreakpointStyles: StyledBreakpointStyles = {
  xxl: css`
    padding: 20px 40px;
  `,
  xl: css`
    padding: 20px 15px;
  `,
}

export const DrawerStyled = styled(Drawer)<StyledBreakpointsProps>`
  .ant-drawer-header {
    ${({ $breakpoints }) =>
      applyBreakpointStyles($breakpoints, drawerBreakpointStyles)}
  }

  .ant-drawer-close {
    padding-left: 0;
  }

  .ant-drawer-body {
    padding: 0;
    background-color: ${({ theme }) => theme.colors.lotion};
  }
`
