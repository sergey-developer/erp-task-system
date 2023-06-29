import { RouteEnum } from 'configs/routes'

import { QrcodeIcon, UnorderedListIcon } from 'components/Icons'

import { NavMenuItem } from './interfaces'

const navMenuCommonConfig: Array<NavMenuItem> = [
  {
    key: RouteEnum.TaskList,
    icon: UnorderedListIcon,
    link: RouteEnum.TaskList,
    text: 'Заявки',
  },
  {
    key: RouteEnum.FiscalDrives,
    icon: QrcodeIcon,
    link: RouteEnum.FiscalDrives,
    text: 'Отчёт по ФН',
  },
]

export default navMenuCommonConfig
