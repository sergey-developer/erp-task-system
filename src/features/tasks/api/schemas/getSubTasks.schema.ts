import { RequestWithTask } from 'features/tasks/api/types'

import { SubTaskDTO } from '../dto'

export type GetSubTasksRequest = RequestWithTask
export type GetSubTasksResponse = SubTaskDTO[]
