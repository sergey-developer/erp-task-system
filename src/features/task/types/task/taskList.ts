import { TaskListItemModel } from 'features/task/models'

import { AntdPagination } from 'lib/antd/types'

export type GetTasksTransformedResponse = AntdPagination<TaskListItemModel>
