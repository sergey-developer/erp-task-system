import { IdType } from 'shared/types/common'

import { FiscalAccumulatorTasksModel } from './fiscalAccumulatorTasks.model'

export type GetFiscalAccumulatorTasksQueryArgs = Partial<{
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
}>

export type GetFiscalAccumulatorTasksSuccessResponse = FiscalAccumulatorTasksModel
