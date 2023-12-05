import { FiscalAccumulatorRouteEnum } from 'modules/fiscalAccumulator/constants'
import { WorkGroupRouteEnum } from 'modules/workGroup/constants'

import { QrcodeIcon, TeamIcon } from 'components/Icons'

import { NavMenuItem } from './types'

const navMenuEngineerConfig: NavMenuItem[] = [
  {
    key: WorkGroupRouteEnum.WorkGroups,
    icon: TeamIcon,
    link: WorkGroupRouteEnum.WorkGroups,
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
