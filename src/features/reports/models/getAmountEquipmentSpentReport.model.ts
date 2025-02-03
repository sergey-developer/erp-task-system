import { PaginationParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { IdType } from 'shared/types/common'

import { AmountEquipmentSpentReportListItemModel } from './amountEquipmentSpentReport.model'

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
  PaginationResponse<AmountEquipmentSpentReportListItemModel>
