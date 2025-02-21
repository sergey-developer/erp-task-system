import { TaskMapDTO, TasksMapDTO } from 'features/tasks/api/dto'
import { Coordinate } from 'ol/coordinate'
import { Geometry as OlGeometry } from 'ol/geom'

import { MaybeNull } from 'shared/types/utils'

export type TasksOnMapProps = {
  tasks: TasksMapDTO
  onClickTask: (coords: MaybeNull<Coordinate>) => void
}

export type FeatureData = Pick<TaskMapDTO, 'id' | 'type'>

export type Geometry = OlGeometry & { getCoordinates: () => Coordinate }
