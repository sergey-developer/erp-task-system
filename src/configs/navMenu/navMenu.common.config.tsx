import { RouteEnum } from 'configs/routes'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import { ReadIcon, UnorderedListIcon } from 'components/Icons'

import { NavMenuItem } from './types'

const navMenuCommonConfig: NavMenuItem[] = [
  {
    key: RouteEnum.Desktop,
    icon: UnorderedListIcon,
    link: RouteEnum.DesktopTaskList,
    text: 'Рабочий стол',
  },
  {
    key: WarehouseRouteEnum.ManageWarehouses,
    icon: ReadIcon,
    text: 'Управление складами',
    children: [
      {
        key: WarehouseRouteEnum.WarehouseCatalogList,
        text: 'Справочники',
        link: WarehouseRouteEnum.WarehouseCatalogList,
      },
      {
        key: WarehouseRouteEnum.ReserveCatalogList,
        text: 'Управление запасами',
        link: WarehouseRouteEnum.ReserveCatalogList,
      },
    ],
  },
]

export default navMenuCommonConfig
