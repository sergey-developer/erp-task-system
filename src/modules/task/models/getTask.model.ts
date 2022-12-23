import { TaskListItemModel } from 'modules/task/models'

import { TaskDetailsModel } from './taskDetails.model'

export type GetTaskResponseModel = TaskDetailsModel
export type GetTaskQueryArgsModel = TaskListItemModel['id']
