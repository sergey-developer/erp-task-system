import { TaskListItemModel } from 'modules/task/models'

export type TaskListMapItemModel = Pick<
  TaskListItemModel,
  'id' | 'type' | 'name' | 'title' | 'olaNextBreachTime'
> & {
  lat: string
  long: string
}

export type TaskListMapModel = TaskListMapItemModel[]
