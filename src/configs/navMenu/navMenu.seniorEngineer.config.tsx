import { TeamIcon } from 'components/Icons'
import { RoutesEnum } from 'configs/routes'

import { NavMenuItem } from './interfaces'

const navMenuSeniorEngineerConfig: Array<NavMenuItem> = [
  {
    key: RoutesEnum.WorkingGroups,
    icon: TeamIcon,
    link: RoutesEnum.WorkingGroups,
    text: 'Рабочие группы',
  },
]

export default navMenuSeniorEngineerConfig
