import { PaginatedListSuccessResponse } from 'shared/models'
import { PaginationParams } from 'shared/types/pagination'

import { EquipmentListItemModel } from './equipmentList.model'

export type GetEquipmentListQueryArgs = PaginationParams & Partial<{
  nomenclature: number
}>

export type GetEquipmentListSuccessResponse =
  PaginatedListSuccessResponse<EquipmentListItemModel>
