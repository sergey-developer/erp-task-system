import { PaginationResponse } from 'shared/models/pagination.model'
import { IdType } from 'shared/types/common'
import { PaginationParams } from 'shared/types/pagination'

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
