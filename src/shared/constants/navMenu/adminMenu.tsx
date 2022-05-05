import { ToolOutlined } from '@ant-design/icons'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import React from 'react'
import { Link } from 'react-router-dom'

import { RoutesEnum } from 'configs/routes'

const adminMenu: ItemType[] = [
  {
    label: <Link to={RoutesEnum.AdminPanel}>Админ-панель</Link>,
    icon: <ToolOutlined className='font-s-18' />,
    key: RoutesEnum.AdminPanel,
  },
]

export default adminMenu
