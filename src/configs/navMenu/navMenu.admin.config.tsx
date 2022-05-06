import { ToolOutlined } from '@ant-design/icons'

import { RoutesEnum } from 'configs/routes'

import { NavMenuItem } from './interfaces'

const navMenuAdminConfig: Array<NavMenuItem> = [
  {
    key: RoutesEnum.AdminPanel,
    icon: ToolOutlined,
    link: RoutesEnum.AdminPanel,
    text: 'Админ-панель',
  },
]

export default navMenuAdminConfig
