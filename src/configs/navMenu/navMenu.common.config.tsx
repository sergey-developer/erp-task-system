import { UnorderedListIcon } from 'components/Icons'
import { RoutesEnum } from 'configs/routes'

import { NavMenuItem } from './interfaces'

const navMenuCommonConfig: Array<NavMenuItem> = [
  {
    key: RoutesEnum.TaskList,
    icon: UnorderedListIcon,
    link: RoutesEnum.TaskList,
    text: 'Заявки',
  },
]

export default navMenuCommonConfig
