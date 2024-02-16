import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { BaseNomenclatureRequestArgs } from 'modules/warehouse/types'

import { PaginationResponse } from 'shared/models/pagination.model'
import { IdType } from 'shared/types/common'
import { PaginationParams } from 'shared/types/pagination'

import { HistoryNomenclatureOperationsReportListItemModel } from './historyNomenclatureOperationsReport.model'

export type GetHistoryNomenclatureOperationsReportQueryArgs = BaseNomenclatureRequestArgs &
  PaginationParams &
  Partial<{
    conditions: EquipmentConditionEnum[]
    locations: IdType[]
    owners: IdType[]
    createdAtFrom: string
    createdAtTo: string
  }>

export type GetHistoryNomenclatureOperationsReportSuccessResponse =
  PaginationResponse<HistoryNomenclatureOperationsReportListItemModel>
