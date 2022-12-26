import { TaskListItemModel } from 'modules/task/models'

import { TaskModel } from './task.model'

export type GetTaskResponseModel = TaskModel
export type GetTaskQueryArgsModel = TaskListItemModel['id']
