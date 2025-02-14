import { TaskRequestArgs } from 'features/task/types'

import { SubTaskModel } from './subTask.model'

export type GetSubTaskListRequest = TaskRequestArgs
export type GetSubTaskListResponse = SubTaskModel[]
