import { ToolIcon } from 'components/Icons'
import { RoutesEnum } from 'configs/routes'

import { NavMenuItem } from './interfaces'

const navMenuAdminConfig: Array<NavMenuItem> = [
  {
    key: RoutesEnum.AdminPanel,
    icon: ToolIcon,
    link: RoutesEnum.AdminPanel,
    text: 'Админ-панель',
  },
]

export default navMenuAdminConfig
