import { TeamOutlined } from '@ant-design/icons'

import { RoutesEnum } from 'configs/routes'

import { NavMenuItem } from './interfaces'

const navMenuSeniorEngineerConfig: Array<NavMenuItem> = [
  {
    key: RoutesEnum.WorkingGroups,
    icon: TeamOutlined,
    link: RoutesEnum.WorkingGroups,
    text: 'Рабочие группы',
  },
]

export default navMenuSeniorEngineerConfig
