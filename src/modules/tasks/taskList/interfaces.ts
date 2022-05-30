import { AntdPaginatedList } from 'lib/antd/interfaces'

import { TaskListItemModel } from './models'

export type GetTaskListTransformedResponse =
  AntdPaginatedList<TaskListItemModel>
