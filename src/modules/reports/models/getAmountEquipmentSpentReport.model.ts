import { PaginationResponse } from 'shared/models/pagination.model'
import { IdType } from 'shared/types/common'
import { PaginationParams } from 'shared/types/pagination'

import { AmountEquipmentSpentReportListItemModel } from './amountEquipmentSpentReport.model'

export type GetAmountEquipmentSpentReportQueryArgs = Partial<
  PaginationParams & {
    nomenclature: IdType
    relocateFrom: IdType
    relocateTo: IdType
    createdAtFrom: string
    createdAtTo: string
  }
>

export type GetAmountEquipmentSpentReportSuccessResponse =
  PaginationResponse<AmountEquipmentSpentReportListItemModel>
