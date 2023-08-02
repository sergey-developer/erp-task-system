import { BaseTaskModel } from 'modules/task/models'

export type TaskListMapItemModel = Pick<BaseTaskModel, 'id' | 'type'> & {
  lat: string
  long: string
}

export type TaskListMapModel = TaskListMapItemModel[]
