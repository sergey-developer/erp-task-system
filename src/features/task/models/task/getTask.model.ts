import { TaskListItemModel, TaskModel } from 'features/task/models'

export type GetTaskRequest = TaskListItemModel['id']
export type GetTaskResponse = TaskModel
