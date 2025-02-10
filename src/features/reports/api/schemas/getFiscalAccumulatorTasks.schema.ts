import { IdType } from 'shared/types/common'

import { FiscalAccumulatorTasksDTO } from '../dto'

export type GetFiscalAccumulatorTasksReportQueryArgs = Partial<{
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
}>

export type GetFiscalAccumulatorTasksReportSuccessResponse = FiscalAccumulatorTasksDTO
