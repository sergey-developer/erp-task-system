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
]

export default navMenuCommonConfig
