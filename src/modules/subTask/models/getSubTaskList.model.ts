import { TaskDetailsModel } from 'modules/task/models'

import { SubTaskModel } from './subTask.model'

export type GetSubTaskListQueryArgsModel = TaskDetailsModel['id']

export type GetSubTaskListResponseModel = Array<SubTaskModel>
