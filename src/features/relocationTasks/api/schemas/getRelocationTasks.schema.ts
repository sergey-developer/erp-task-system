import { RequestWithTask } from 'features/tasks/api/types'

import { PaginationRequestParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'
import { ExtendSortKey, SortParams } from 'shared/types/sort'

import { RelocationTaskStatusEnum, RelocationTaskTypeEnum } from '../constants'
import { RelocationTaskDTO } from '../dto'

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

export type GetRelocationTasksRequest<
  SortValue extends GetRelocationTasksSortValue = GetRelocationTasksSortValue,
> = GetRelocationTasksFilter &
  PaginationRequestParams &
  FilterParams &
  SortParams<SortValue> &
  Partial<RequestWithTask & { inventorization: IdType }>

export type GetRelocationTasksResponse = PaginationResponse<RelocationTaskDTO>
