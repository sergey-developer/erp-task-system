import { RouteEnum } from 'configs/routes'

import { ReadIcon, UnorderedListIcon } from 'components/Icons'

import { NavMenuItem } from './types'

const navMenuCommonConfig: NavMenuItem[] = [
  {
    key: RouteEnum.Tasks,
    icon: UnorderedListIcon,
    link: RouteEnum.TaskList,
    text: 'Рабочий стол',
  },
  {
    key: RouteEnum.ManageWarehouses,
    icon: ReadIcon,
    text: 'Управление складами',
    children: [
      {
        key: RouteEnum.WarehouseCatalogList,
        text: 'Справочники',
        link: RouteEnum.WarehouseCatalogList,
      },
      {
        key: RouteEnum.ReserveCatalogList,
        text: 'Управление запасами',
        link: RouteEnum.ReserveCatalogList,
      },
    ],
  },
]

export default navMenuCommonConfig
