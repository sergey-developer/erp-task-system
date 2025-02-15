import { AntdPagination } from 'lib/antd/types'

import { TaskDTO } from '../dto'

export type GetTasksTransformedResponse = AntdPagination<TaskDTO>
