import {
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'
import { RelocationTaskListItemModel } from 'modules/warehouse/models'

import { PaginationResponse } from 'shared/models/pagination.model'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'
import { PaginationParams } from 'shared/types/pagination'
import { ExtendSortKey } from 'shared/types/sort'

export type GetRelocationTaskListSortKey =
  | 'id'
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
  type: RelocationTaskTypeEnum[]
  deadlineAtFrom: string
  deadlineAtTo: string
  locationsFrom: IdType[]
  locationsTo: IdType[]
  executor: IdType
  controller: IdType
  createdBy: IdType
  createdAtFrom: string
  createdAtTo: string
}>

export type GetRelocationTaskListQueryArgs = GetRelocationTaskListFilter &
  PaginationParams &
  FilterParams &
  Partial<{
    ordering: GetRelocationTaskListSortValue
    taskId: IdType
  }>

export type GetRelocationTaskListSuccessResponse = PaginationResponse<RelocationTaskListItemModel>
