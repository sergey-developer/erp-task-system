import { RouteEnum } from 'configs/routes'

import { UnorderedListIcon, ReadIcon } from 'components/Icons'

import { NavMenuItem } from './types'

const navMenuCommonConfig: Array<NavMenuItem> = [
  {
    key: RouteEnum.Tasks,
    icon: UnorderedListIcon,
    link: RouteEnum.TaskList,
    text: 'Заявки',
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
    ],
  },
]

export default navMenuCommonConfig
