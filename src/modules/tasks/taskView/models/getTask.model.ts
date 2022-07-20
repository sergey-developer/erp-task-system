import { TaskListItemModel } from 'modules/tasks/taskList/models'

import { TaskDetailsModel } from './taskDetails.model'

export type GetTaskByIdResponseModel = TaskDetailsModel
export type GetTaskByIdQueryArgsModel = TaskListItemModel['id']
