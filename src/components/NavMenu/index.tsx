import { MenuProps } from 'antd/es/menu'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import React, { FC } from 'react'

import { MenuStyled } from './styles'

export type NavMenuProps = Pick<MenuProps, 'selectedKeys'> & {
  items: Array<ItemType & { key: string }>
}

const NavMenu: FC<NavMenuProps> = ({ selectedKeys, items }) => {
  return (
    <MenuStyled
      mode='horizontal'
      selectedKeys={selectedKeys}
      items={items}
      triggerSubMenuAction='click'
    />
  )
}

export default NavMenu
