import { ReportsRoutesEnum } from 'features/reports/routes/routes'
import { TasksRoutesEnum } from 'features/tasks/routes/routes'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'

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
    key: WarehousesRoutesEnum.ManageWarehouses,
    icon: ReadIcon,
    text: 'Управление складами',
    children: [
      {
        key: WarehousesRoutesEnum.WarehousesCatalog,
        text: 'Справочники',
        link: WarehousesRoutesEnum.WarehousesCatalog,
      },
      {
        key: WarehousesRoutesEnum.Reserves,
        text: 'Управление запасами',
        link: WarehousesRoutesEnum.Reserves,
      },
      {
        key: WarehousesRoutesEnum.Reports,
        text: 'Отчёты',
        link: WarehousesRoutesEnum.Reports,
        disabled: (permissions: UserPermissionsEnum[]) =>
          !permissions.includes(UserPermissionsEnum.WarehouseReportsRead),
      },
    ],
  },
]

export default navMenuConfig
