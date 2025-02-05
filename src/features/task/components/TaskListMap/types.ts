import { TaskListMapItemModel, TasksMapModel } from 'features/task/models'
import { Coordinate } from 'ol/coordinate'
import { Geometry as OlGeometry } from 'ol/geom'

import { MaybeNull } from 'shared/types/utils'

export type TaskListMapProps = {
  tasks: TasksMapModel
  onClickTask: (coords: MaybeNull<Coordinate>) => void
}

export type FeatureData = Pick<TaskListMapItemModel, 'id' | 'type'>

export type Geometry = OlGeometry & { getCoordinates: () => Coordinate }
