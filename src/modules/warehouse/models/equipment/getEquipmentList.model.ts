import { PaginatedListSuccessResponse } from 'shared/models'
import { PaginationParams } from 'shared/types/pagination'
import { ExtendSortKey } from 'shared/types/sort'

import { EquipmentListItemModel } from './equipmentList.model'

export type GetEquipmentListSortKey =
  | 'title'
  | 'serial_number'
  | 'inventory_number'
  | 'warehouse'
  | 'condition'
  | 'quantity'
  | 'category'
  | 'purpose'

export type GetEquipmentListSortValue = ExtendSortKey<GetEquipmentListSortKey>

export type GetEquipmentListQueryArgs = PaginationParams &
  Partial<{
    search: string
    nomenclatureId: number
    ordering: GetEquipmentListSortValue
  }>

export type GetEquipmentListSuccessResponse = PaginatedListSuccessResponse<EquipmentListItemModel>
