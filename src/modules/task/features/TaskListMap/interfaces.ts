import { TaskListMapItemModel, TaskListMapModel } from 'modules/task/models'

export type TaskListMapProps = {
  tasks: TaskListMapModel
}

export type FeatureData = Pick<TaskListMapItemModel, 'id' | 'type'>
