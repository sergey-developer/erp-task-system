import { BaseNomenclatureRequestArgs } from 'modules/warehouse/types'

import { PaginationResponse } from 'shared/models/pagination.model'
import { PaginationParams } from 'shared/types/pagination'

import { HistoryNomenclatureOperationsReportListItemModel } from './historyNomenclatureOperationsReport.model'

export type GetHistoryNomenclatureOperationsReportQueryArgs = BaseNomenclatureRequestArgs &
  PaginationParams &
  Partial<{
    createdAtFrom: string
    createdAtTo: string
  }>

export type GetHistoryNomenclatureOperationsReportSuccessResponse =
  PaginationResponse<HistoryNomenclatureOperationsReportListItemModel>
