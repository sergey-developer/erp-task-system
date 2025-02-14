import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { BaseNomenclatureRequestArgs } from 'features/warehouse/types'

import { PaginationRequestParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { IdType } from 'shared/types/common'

import { HistoryNomenclatureOperationsReportItemDTO } from '../dto'

export type GetHistoryNomenclatureOperationsReportRequest = BaseNomenclatureRequestArgs &
  PaginationRequestParams &
  Partial<{
    conditions: EquipmentConditionEnum[]
    locations: IdType[]
    owners: IdType[]
    createdAtFrom: string
    createdAtTo: string
  }>

export type GetHistoryNomenclatureOperationsReportResponse =
  PaginationResponse<HistoryNomenclatureOperationsReportItemDTO>
