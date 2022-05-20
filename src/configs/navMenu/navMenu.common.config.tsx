import { UnorderedListOutlined } from '@ant-design/icons'

import { RoutesEnum } from 'configs/routes'

import { NavMenuItem } from './interfaces'

const navMenuCommonConfig: Array<NavMenuItem> = [
  {
    key: RoutesEnum.TaskList,
    icon: UnorderedListOutlined,
    link: RoutesEnum.TaskList,
    text: 'Заявки',
  },
]

export default navMenuCommonConfig
