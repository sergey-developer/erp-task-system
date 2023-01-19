import { TaskModel } from 'modules/task/models'

import { SubTaskModel } from './subTask.model'

export type GetSubTaskListQueryArgs = TaskModel['id']

export type GetSubTaskListSuccessResponse = Array<SubTaskModel>
