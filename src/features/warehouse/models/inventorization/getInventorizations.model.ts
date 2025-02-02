import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'features/warehouse/constants/inventorization'

import { PaginationParams, PaginationResponse } from 'shared/dto/api/pagination.dto'
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

export type GetInventorizationsFilter = Partial<{
  types: InventorizationTypeEnum[]
  statuses: InventorizationStatusEnum[]
}>

export type GetInventorizationsQueryArgs = PaginationParams &
  SortParams<GetInventorizationsSortValue> &
  GetInventorizationsFilter

export type GetInventorizationsSuccessResponse = PaginationResponse<InventorizationListItemModel>
