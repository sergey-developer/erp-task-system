import { Menu as BaseMenu } from 'antd'

import styled from 'styled-components'

const Menu = styled(BaseMenu)`
  border-bottom: 0;
  color: #4f4f4f;

  .ant-menu-item {
    display: flex;
    align-items: center;
  }
`

export default Menu
