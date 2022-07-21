import { TaskListItemModel } from 'modules/tasks/taskList/models'

import { TaskDetailsModel } from './taskDetails.model'

export type GetTaskResponseModel = TaskDetailsModel
export type GetTaskQueryArgsModel = TaskListItemModel['id']
