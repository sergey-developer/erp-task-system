import { UnorderedListOutlined } from '@ant-design/icons'

import { RoutesEnum } from 'configs/routes'
import { taskListDefaultRoute } from 'modules/tasks/taskList/components/TaskListPage/constants'

import { NavMenuItem } from './interfaces'

const navMenuCommonConfig: Array<NavMenuItem> = [
  {
    key: RoutesEnum.TaskList,
    icon: UnorderedListOutlined,
    link: taskListDefaultRoute,
    text: 'Заявки',
  },
]

export default navMenuCommonConfig
