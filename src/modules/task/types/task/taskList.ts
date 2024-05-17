import { AntdPaginatedList } from 'lib/antd/types'

import { TaskListItemModel } from 'modules/task/models'

export type GetTasksTransformedSuccessResponse = AntdPaginatedList<TaskListItemModel>
