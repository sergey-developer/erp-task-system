import { ReportsRoutesEnum } from 'modules/reports/constants'
import { TasksRoutesEnum } from 'modules/task/constants/routes'
import { UserPermissionsEnum } from 'modules/user/constants'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import { FileTextIcon, ReadIcon, UnorderedListIcon } from 'components/Icons'

import { NavMenuItem } from './types'

const navMenuCommonConfig: NavMenuItem[] = [
  {
    key: TasksRoutesEnum.DesktopTasks,
    icon: UnorderedListIcon,
    link: TasksRoutesEnum.DesktopTaskList,
    text: 'Рабочий стол',
  },
  {
    key: ReportsRoutesEnum.Reports,
    icon: FileTextIcon,
    link: ReportsRoutesEnum.Reports,
    text: 'Отчёты',
    visible: (permissions: UserPermissionsEnum[]) =>
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

export default navMenuCommonConfig
