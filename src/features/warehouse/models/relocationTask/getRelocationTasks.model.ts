import { TaskRequestArgs } from 'features/task/types'
import {
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'features/warehouse/constants/relocationTask'
import { RelocationTaskListItemModel } from 'features/warehouse/models'

import { PaginationParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'
import { ExtendSortKey, SortParams } from 'shared/types/sort'

export type GetRelocationTasksSortKey =
  | 'id'
  | 'type'
  | 'deadline_at'
  | 'relocate_from'
  | 'relocate_to'
  | 'completed_by'
  | 'controller'
  | 'status'
  | 'created_by'
  | 'created_at'

export type GetRelocationTasksSortValue = ExtendSortKey<GetRelocationTasksSortKey>

export type GetRelocationTasksFilter = Partial<{
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

export type GetRelocationTasksQueryArgs<
  SortValue extends GetRelocationTasksSortValue = GetRelocationTasksSortValue,
> = GetRelocationTasksFilter &
  PaginationParams &
  FilterParams &
  SortParams<SortValue> &
  Partial<TaskRequestArgs & { inventorization: IdType }>

export type GetRelocationTasksSuccessResponse = PaginationResponse<RelocationTaskListItemModel>
