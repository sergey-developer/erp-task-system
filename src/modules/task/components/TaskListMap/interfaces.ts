import { Coordinate } from 'ol/coordinate'

import { TaskListMapItemModel, TaskListMapModel } from 'modules/task/models'

import { MaybeNull } from 'shared/interfaces/utils'

export type TaskListMapProps = {
  tasks: TaskListMapModel
  onClickTask: (coords: MaybeNull<Coordinate>) => void
}

export type FeatureData = Pick<TaskListMapItemModel, 'id' | 'type'>
