import { RouteEnum } from 'configs/routes'

import { QrcodeIcon, TeamIcon } from 'components/Icons'

import { NavMenuItem } from './interfaces'

const navMenuEngineerConfig: Array<NavMenuItem> = [
  {
    key: RouteEnum.WorkingGroups,
    icon: TeamIcon,
    link: RouteEnum.WorkingGroups,
    text: 'Рабочие группы',
  },
  {
    key: RouteEnum.FiscalDrives,
    icon: QrcodeIcon,
    link: RouteEnum.FiscalDrives,
    text: 'Отчёт по ФН',
  },
]

export default navMenuEngineerConfig
