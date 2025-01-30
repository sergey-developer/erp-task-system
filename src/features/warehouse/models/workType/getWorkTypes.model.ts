import { TaskTypeEnum } from 'features/task/constants/task'
import { WorkTypesModel } from 'features/warehouse/models'

export type GetWorkTypesQueryArgs = Partial<{
  taskType: TaskTypeEnum
}>

export type GetWorkTypesSuccessResponse = WorkTypesModel
