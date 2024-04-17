import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'modules/warehouse/constants/inventorization'

import { PaginationResponse } from 'shared/models/pagination.model'
import { PaginationParams } from 'shared/types/pagination'
import { ExtendSortKey, SortParams } from 'shared/types/sort'

import { InventorizationListItemModel } from './inventorizations.model'

export type GetInventorizationsSortKey =
  | 'type'
  | 'deadline_at'
  | 'executor'
  | 'status'
  | 'created_by'
  | 'created_at'

export type GetInventorizationsSortValue = ExtendSortKey<GetInventorizationsSortKey>

export type GetInventorizationsQueryArgs = PaginationParams &
  SortParams<GetInventorizationsSortValue> &
  Partial<{
    types: InventorizationTypeEnum[]
    statuses: InventorizationStatusEnum[]
  }>

export type GetInventorizationsSuccessResponse = PaginationResponse<InventorizationListItemModel>
