import { CommonRouteEnum } from 'configs/routes'

import { UserPermissionsEnum } from 'modules/user/constants'
import { UserPermissions } from 'modules/user/models'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import { ReadIcon, UnorderedListIcon } from 'components/Icons'

import { NavMenuItem } from './types'

const navMenuCommonConfig: NavMenuItem[] = [
  {
    key: CommonRouteEnum.DesktopTasks,
    icon: UnorderedListIcon,
    link: CommonRouteEnum.DesktopTaskList,
    text: 'Рабочий стол',
  },
  {
    key: WarehouseRouteEnum.ManageWarehouses,
    icon: ReadIcon,
    text: 'Управление складами',
    children: [
      {
        key: WarehouseRouteEnum.WarehouseCatalogs,
        text: 'Справочники',
        link: WarehouseRouteEnum.WarehouseCatalogs,
      },
      {
        key: WarehouseRouteEnum.Reserves,
        text: 'Управление запасами',
        link: WarehouseRouteEnum.Reserves,
      },
      {
        key: WarehouseRouteEnum.Reports,
        text: 'Отчеты',
        link: WarehouseRouteEnum.Reports,
        shouldDisable: (permissions: UserPermissions[]) =>
          !permissions.includes(UserPermissionsEnum.WarehouseReportsRead),
      },
    ],
  },
]

export default navMenuCommonConfig
