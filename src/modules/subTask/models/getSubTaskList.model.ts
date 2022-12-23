import { TaskModel } from 'modules/task/models'

import { SubTaskModel } from './subTask.model'

export type GetSubTaskListQueryArgsModel = TaskModel['id']

export type GetSubTaskListResponseModel = Array<SubTaskModel>
