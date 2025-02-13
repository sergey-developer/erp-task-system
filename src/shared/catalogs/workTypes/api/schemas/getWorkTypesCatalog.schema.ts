import { TaskTypeEnum } from 'features/task/constants/task'

import { WorkTypesCatalogDTO } from '../dto'

export type GetWorkTypesCatalogQueryArgs = Partial<{
  taskType: TaskTypeEnum
}>

export type GetWorkTypesCatalogSuccessResponse = WorkTypesCatalogDTO
