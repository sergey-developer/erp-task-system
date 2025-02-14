import { PaginationRequestParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { IdType } from 'shared/types/common'

import { AmountEquipmentSpentReportItemDTO } from '../dto'

export type GetAmountEquipmentSpentReportRequest = PaginationRequestParams &
  Partial<{
    nomenclature: IdType
    relocateFrom: IdType
    relocateTo: IdType
    createdAtFrom: string
    createdAtTo: string
    categories: IdType[]
  }>

export type GetAmountEquipmentSpentReportResponse =
  PaginationResponse<AmountEquipmentSpentReportItemDTO>
