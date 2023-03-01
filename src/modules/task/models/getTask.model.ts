import { TaskListItemModel } from 'modules/task/models'

import { TaskModel } from './task.model'

export type GetTaskSuccessResponse = TaskModel
export type GetTaskQueryArgs = TaskListItemModel['id']
