import { MenuProps } from 'antd/lib/menu'
import React, { FC } from 'react'

import { MenuStyled } from './styles'

type NavigationProps = Pick<MenuProps, 'items' | 'selectedKeys'>

const Navigation: FC<NavigationProps> = ({ selectedKeys, items }) => {
  return (
    <MenuStyled mode='horizontal' selectedKeys={selectedKeys} items={items} />
  )
}

export default Navigation
