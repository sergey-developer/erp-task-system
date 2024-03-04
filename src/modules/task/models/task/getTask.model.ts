import { TaskListItemModel, TaskModel } from 'modules/task/models'

export type GetTaskQueryArgs = TaskListItemModel['id']
export type GetTaskSuccessResponse = TaskModel
