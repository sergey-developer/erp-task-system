import { TaskTypeEnum } from 'features/task/constants/task'

import { WorkTypesCatalogDTO } from '../dto'

export type GetWorkTypesCatalogRequest = Partial<{
  taskType: TaskTypeEnum
}>

export type GetWorkTypesCatalogResponse = WorkTypesCatalogDTO
