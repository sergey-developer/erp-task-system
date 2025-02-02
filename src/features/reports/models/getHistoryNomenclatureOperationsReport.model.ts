import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import { BaseNomenclatureRequestArgs } from 'features/warehouse/types'

import { PaginationParams, PaginationResponse } from 'shared/dto/api/pagination.dto'
import { IdType } from 'shared/types/common'

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
