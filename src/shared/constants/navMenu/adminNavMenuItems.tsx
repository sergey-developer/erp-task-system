import { ToolOutlined } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'

import { RoutesEnum } from 'configs/routes'

import { NavMenuItem } from './interfaces'

const adminNavMenuItems: Array<NavMenuItem> = [
  {
    label: <Link to={RoutesEnum.AdminPanel}>Админ-панель</Link>,
    icon: <ToolOutlined className='font-s-18' />,
    key: RoutesEnum.AdminPanel,
  },
]

export default adminNavMenuItems
