import { TaskListItemModel, TaskModel } from 'features/task/models'

export type GetTaskQueryArgs = TaskListItemModel['id']
export type GetTaskSuccessResponse = TaskModel
