import { RouteEnum } from 'configs/routes'

import { FiscalAccumulatorRouteEnum } from 'modules/fiscalAccumulator/constants'

import { QrcodeIcon, TeamIcon } from 'components/Icons'

import { NavMenuItem } from './types'

const navMenuEngineerConfig: NavMenuItem[] = [
  {
    key: RouteEnum.WorkingGroups,
    icon: TeamIcon,
    link: RouteEnum.WorkingGroups,
    text: 'Рабочие группы',
  },
  {
    key: FiscalAccumulatorRouteEnum.FiscalAccumulator,
    icon: QrcodeIcon,
    link: FiscalAccumulatorRouteEnum.FiscalAccumulator,
    text: 'Отчёт по ФН',
  },
]

export default navMenuEngineerConfig
