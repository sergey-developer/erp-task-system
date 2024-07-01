import { TaskRequestArgs } from 'modules/task/types'
import {
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'
import { RelocationTaskListItemModel } from 'modules/warehouse/models'

import { PaginationResponse } from 'shared/models/pagination.model'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'
import { PaginationParams } from 'shared/types/pagination'
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

export type GetRelocationTasksQueryArgs = GetRelocationTasksFilter &
  PaginationParams &
  FilterParams &
  Partial<TaskRequestArgs> &
  SortParams<GetRelocationTasksSortValue>

export type GetRelocationTasksSuccessResponse = PaginationResponse<RelocationTaskListItemModel>
