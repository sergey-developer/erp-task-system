import { TaskListItemModel } from 'modules/task/features/TaskList/models'

import { TaskDetailsModel } from './taskDetails.model'

export type GetTaskResponseModel = TaskDetailsModel
export type GetTaskQueryArgsModel = TaskListItemModel['id']
