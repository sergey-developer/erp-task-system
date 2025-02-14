import { RequestWithTask } from 'features/task/types'

import { SubTaskModel } from './subTask.model'

export type GetSubTaskListRequest = RequestWithTask
export type GetSubTaskListResponse = SubTaskModel[]
