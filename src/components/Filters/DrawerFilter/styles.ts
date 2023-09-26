import { Drawer } from 'antd'
import styled from 'styled-components'

// const drawerBreakpointStyles: StyledBreakpointStyles = {
//   xxl: css`
//     padding: 20px 40px;
//   `,
//   xl: css`
//     padding: 20px 15px;
//   `,
// }

export const DrawerStyled = styled(Drawer)`
  .ant-drawer-close {
    padding-left: 0;
  }

  .ant-drawer-body {
    padding: 0;
    background-color: ${({ theme }) => theme.colors.lotion};
  }
`
