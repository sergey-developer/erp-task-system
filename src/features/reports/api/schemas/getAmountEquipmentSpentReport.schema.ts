import { PaginationParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { IdType } from 'shared/types/common'

import { AmountEquipmentSpentReportItemDTO } from '../dto'

export type GetAmountEquipmentSpentReportQueryArgs = PaginationParams &
  Partial<{
    nomenclature: IdType
    relocateFrom: IdType
    relocateTo: IdType
    createdAtFrom: string
    createdAtTo: string
    categories: IdType[]
  }>

export type GetAmountEquipmentSpentReportSuccessResponse =
  PaginationResponse<AmountEquipmentSpentReportItemDTO>
