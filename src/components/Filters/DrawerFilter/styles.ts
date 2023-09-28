import { Drawer } from 'antd'
import styled from 'styled-components'

export const DrawerStyled = styled(Drawer)`
  .ant-drawer-close {
    padding-left: 0;
  }

  .ant-drawer-body {
    padding: 0;
    background-color: ${({ theme }) => theme.colors.lotion};
  }
`
