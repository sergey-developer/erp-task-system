import { PaginatedListSuccessResponse } from 'shared/models/pagination.model'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'
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
  Partial<
    FilterParams & {
      nomenclature: IdType
      ordering: GetEquipmentListSortValue
    }
  >

export type GetEquipmentListSuccessResponse = PaginatedListSuccessResponse<EquipmentListItemModel>
