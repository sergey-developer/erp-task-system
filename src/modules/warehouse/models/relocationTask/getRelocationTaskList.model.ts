import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'
import { RelocationTaskListItemModel } from 'modules/warehouse/models'

import { PaginatedListSuccessResponse } from 'shared/models/pagination.model'
import { PaginationParams } from 'shared/types/pagination'
import { ExtendSortKey } from 'shared/types/sort'

export type GetRelocationTaskListSortKey =
  | 'deadline_at'
  | 'relocate_from'
  | 'relocate_to'
  | 'executor'
  | 'status'
  | 'created_by'
  | 'created_at'

export type GetRelocationTaskListSortValue = ExtendSortKey<GetRelocationTaskListSortKey>

export type GetRelocationTaskListFilter = Partial<{
  statuses: RelocationTaskStatusEnum[]
}>

export type GetRelocationTaskListQueryArgs = PaginationParams &
  GetRelocationTaskListFilter &
  Partial<{
    ordering: GetRelocationTaskListSortValue
  }>

export type GetRelocationTaskListSuccessResponse =
  PaginatedListSuccessResponse<RelocationTaskListItemModel>
