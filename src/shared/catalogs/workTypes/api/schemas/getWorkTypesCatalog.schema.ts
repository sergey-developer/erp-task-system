import { TaskTypeEnum } from 'features/tasks/api/constants'

import { WorkTypesCatalogDTO } from '../dto'

export type GetWorkTypesCatalogRequest = Partial<{
  taskType: TaskTypeEnum
}>

export type GetWorkTypesCatalogResponse = WorkTypesCatalogDTO
