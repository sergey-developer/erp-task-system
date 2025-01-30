import { AntdPaginatedList } from 'lib/antd/types'

import { TaskListItemModel } from 'features/task/models'

export type GetTasksTransformedSuccessResponse = AntdPaginatedList<TaskListItemModel>
