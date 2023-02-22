import { AntdPaginatedList } from 'lib/antd/interfaces'

import { TaskListItemModel } from 'modules/task/models'

export type GetTaskListTransformedResponse =
  AntdPaginatedList<TaskListItemModel>
