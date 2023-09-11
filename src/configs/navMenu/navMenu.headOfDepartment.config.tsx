import { RouteEnum } from 'configs/routes'

import { QrcodeIcon, TeamIcon } from 'components/Icons'

import { NavMenuItem } from './types'

const navMenuHeadOfDepartmentConfig: NavMenuItem[] = [
  {
    key: RouteEnum.WorkingGroups,
    icon: TeamIcon,
    link: RouteEnum.WorkingGroups,
    text: 'Рабочие группы',
  },
  {
    key: RouteEnum.FiscalAccumulatorTaskList,
    icon: QrcodeIcon,
    link: RouteEnum.FiscalAccumulatorTaskList,
    text: 'Отчёт по ФН',
  },
]

export default navMenuHeadOfDepartmentConfig
