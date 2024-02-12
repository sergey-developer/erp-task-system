import { PaginationResponse } from 'shared/models/pagination.model'
import { IdType } from 'shared/types/common'
import { PaginationParams } from 'shared/types/pagination'

import { HistoryNomenclatureOperationsReportListItemModel } from './historyNomenclatureOperationsReport.model'

export type GetHistoryNomenclatureOperationsReportQueryArgs = Partial<
  PaginationParams & {
    nomenclature: IdType
    relocateFrom: IdType
    relocateTo: IdType
    createdAtFrom: string
    createdAtTo: string
  }
>

export type GetHistoryNomenclatureOperationsReportSuccessResponse =
  PaginationResponse<HistoryNomenclatureOperationsReportListItemModel>
