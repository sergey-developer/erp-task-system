import { IdType } from 'shared/types/common'

import { FiscalAccumulatorTasksModel } from './fiscalAccumulatorTasks.model'

export type GetFiscalAccumulatorTasksReportQueryArgs = Partial<{
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
}>

export type GetFiscalAccumulatorTasksReportSuccessResponse = FiscalAccumulatorTasksModel
