import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'
import { RelocationTaskListItemModel } from 'modules/warehouse/models'

import { PaginatedListSuccessResponse } from 'shared/models/pagination.model'
import { IdType } from 'shared/types/common'
import { PaginationParams } from 'shared/types/pagination'
import { ExtendSortKey } from 'shared/types/sort'

export type GetRelocationTaskListSortKey =
  | 'type'
  | 'deadline_at'
  | 'relocate_from'
  | 'relocate_to'
  | 'executor'
  | 'controller'
  | 'status'
  | 'created_by'
  | 'created_at'

export type GetRelocationTaskListSortValue = ExtendSortKey<GetRelocationTaskListSortKey>

export type GetRelocationTaskListFilter = Partial<{
  statuses: RelocationTaskStatusEnum[]
}>

export type GetRelocationTaskListQueryArgs = GetRelocationTaskListFilter &
  Partial<
    PaginationParams & {
      ordering: GetRelocationTaskListSortValue
      taskId: IdType
    }
  >

export type GetRelocationTaskListSuccessResponse =
  PaginatedListSuccessResponse<RelocationTaskListItemModel>
