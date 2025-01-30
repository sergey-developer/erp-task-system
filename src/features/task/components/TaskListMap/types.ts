import { Coordinate } from 'ol/coordinate'
import { Geometry as OlGeometry } from 'ol/geom'

import { TaskListMapItemModel, TaskListMapModel } from 'features/task/models'

import { MaybeNull } from 'shared/types/utils'

export type TaskListMapProps = {
  tasks: TaskListMapModel
  onClickTask: (coords: MaybeNull<Coordinate>) => void
}

export type FeatureData = Pick<TaskListMapItemModel, 'id' | 'type'>

export type Geometry = OlGeometry & { getCoordinates: () => Coordinate }
