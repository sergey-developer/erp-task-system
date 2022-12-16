import { TaskDetailsModel } from 'modules/task/features/TaskView/models'

import { SubTaskModel } from './subTask.model'

export type GetSubTaskListQueryArgsModel = TaskDetailsModel['id']

export type GetSubTaskListResponseModel = Array<SubTaskModel>
