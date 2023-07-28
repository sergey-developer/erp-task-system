import { TaskListMapItemModel, TaskListMapModel } from 'modules/task/models'

export type TaskListMapProps = {
  tasks: TaskListMapModel
  onClick: (coords: [lon: number, lat: number]) => void
}

export type FeatureData = Pick<TaskListMapItemModel, 'id' | 'type'>
