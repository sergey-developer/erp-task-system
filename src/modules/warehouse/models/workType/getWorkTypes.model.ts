import { TaskTypeEnum } from 'modules/task/constants/task'
import { WorkTypesModel } from 'modules/warehouse/models'

export type GetWorkTypesQueryArgs = Partial<{
  taskType: TaskTypeEnum
}>

export type GetWorkTypesSuccessResponse = WorkTypesModel
