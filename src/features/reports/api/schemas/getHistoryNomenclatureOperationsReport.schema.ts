import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { RequestWithNomenclature } from 'features/nomenclatures/api/types'

import { PaginationRequestParams, PaginationResponse } from 'shared/api/schemas'
import { IdType } from 'shared/types/common'

import { HistoryNomenclatureOperationsReportItemDTO } from '../dto'

export type GetHistoryNomenclatureOperationsReportRequest = RequestWithNomenclature &
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
