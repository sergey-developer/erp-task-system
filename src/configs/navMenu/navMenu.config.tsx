import { ReportsRoutesEnum } from 'features/reports/api/constants'
import { TasksRoutesEnum } from 'features/task/constants/routes'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'

import { CommonRoutesEnum } from 'configs/routes'

import { FileTextIcon, ReadIcon, UnorderedListIcon } from 'components/Icons'

import { NavMenuItem } from './types'

const navMenuConfig: NavMenuItem[] = [
  {
    key: CommonRoutesEnum.Desktop,
    icon: UnorderedListIcon,
    link: TasksRoutesEnum.DesktopTasks,
    text: 'Рабочий стол',
  },
  {
    key: ReportsRoutesEnum.ReportsRoot,
    icon: FileTextIcon,
    link: ReportsRoutesEnum.ReportsRoot,
    text: 'Отчёты',
    visible: (permissions) =>
      permissions.includes(UserPermissionsEnum.FiscalAccumulatorTasksRead) ||
      permissions.includes(UserPermissionsEnum.ReportMainIndicatorsRead),
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
        text: 'Отчёты',
        link: WarehouseRouteEnum.Reports,
        disabled: (permissions: UserPermissionsEnum[]) =>
          !permissions.includes(UserPermissionsEnum.WarehouseReportsRead),
      },
    ],
  },
]

export default navMenuConfig
