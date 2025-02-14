import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'features/warehouse/constants/inventorization'

import { PaginationRequestParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
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

export type GetInventorizationsRequest = PaginationRequestParams &
  SortParams<GetInventorizationsSortValue> &
  GetInventorizationsFilter

export type GetInventorizationsResponse = PaginationResponse<InventorizationListItemModel>
