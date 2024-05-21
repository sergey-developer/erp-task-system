import { TaskRequestArgs } from 'modules/task/types'

import { SubTaskModel } from './subTask.model'

export type GetSubTaskListQueryArgs = TaskRequestArgs
export type GetSubTaskListSuccessResponse = SubTaskModel[]
