import { Menu } from 'antd'

import styled from 'styled-components'

export const MenuStyled = styled(Menu)`
  border-bottom: 0;
  color: ${({ theme }) => theme.colors.darkLiver};

  .ant-menu-item {
    display: flex;
    align-items: center;
  }
`
