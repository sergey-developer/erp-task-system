import { IdType } from 'shared/types/common'

import { FiscalAccumulatorTasksDTO } from '../dto'

export type GetFiscalAccumulatorTasksReportRequest = Partial<{
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
}>

export type GetFiscalAccumulatorTasksReportResponse = FiscalAccumulatorTasksDTO
