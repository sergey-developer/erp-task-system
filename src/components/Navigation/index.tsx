import { MenuProps } from 'antd/lib/menu'
import React, { FC } from 'react'

import { MenuStyled } from './styles'

type NavigationProps = Pick<MenuProps, 'items' | 'defaultSelectedKeys'>

const Navigation: FC<NavigationProps> = ({ defaultSelectedKeys, items }) => {
  return (
    <MenuStyled
      mode='horizontal'
      defaultSelectedKeys={defaultSelectedKeys}
      items={items}
    />
  )
}

export default Navigation
