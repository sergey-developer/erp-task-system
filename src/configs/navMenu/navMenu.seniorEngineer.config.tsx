import { RouteEnum } from 'configs/routes'

import { TeamIcon } from 'components/Icons'

import { NavMenuItem } from './interfaces'

const navMenuSeniorEngineerConfig: Array<NavMenuItem> = [
  {
    key: RouteEnum.WorkingGroups,
    icon: TeamIcon,
    link: RouteEnum.WorkingGroups,
    text: 'Рабочие группы',
  },
]

export default navMenuSeniorEngineerConfig
