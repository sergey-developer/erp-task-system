import { RouteEnum } from 'configs/routes'

import { UnorderedListIcon } from 'components/Icons'

import { NavMenuItem } from './interfaces'

const navMenuCommonConfig: Array<NavMenuItem> = [
  {
    key: RouteEnum.TaskList,
    icon: UnorderedListIcon,
    link: RouteEnum.TaskList,
    text: 'Заявки',
  },
  {
    key: RouteEnum.Warehouses,
    icon: UnorderedListIcon,
    text: 'Управление складами',
    children: [
      {
        key: RouteEnum.WarehouseCatalogList,
        text: 'Справочники',
        link: RouteEnum.WarehouseCatalogList,
      },
    ],
  },
]

export default navMenuCommonConfig
