import {
  TaskAssignedEnum,
  TaskExtendedStatusEnum,
  TaskOverdueEnum,
  TasksFastFilterEnum,
} from 'features/task/constants/task'
import { TaskListItemModel } from 'features/task/models'

import { PaginationRequestParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'
import { ExtendSortKey } from 'shared/types/sort'

export type GetTasksSortKey =
  | 'id'
  | 'name'
  | 'title'
  | 'status'
  | 'last_comment_text'
  | 'assignee__last_name'
  | 'record_id'
  | 'work_group__name'
  | 'support_group__name'
  | 'created_at'
  | 'ola_next_breach_time'

export type GetTasksSortValue = ExtendSortKey<GetTasksSortKey>

export type FastFilterQueries = Partial<{
  filters: TasksFastFilterEnum[]
}>

export type SearchFields = Partial<{
  searchByAssignee: string
  searchByName: string
  searchByTitle: string
}>

export type TasksFilterQueries = Partial<{
  completeAtFrom: string
  completeAtTo: string
  dateFrom: string
  dateTo: string
  status: TaskExtendedStatusEnum[]
  isOverdue: TaskOverdueEnum[]
  isAssigned: TaskAssignedEnum[]
  workGroupId: IdType
  manager: IdType
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
}> &
  SearchFields

export type GetTasksRequest = PaginationRequestParams &
  Partial<{
    sort: GetTasksSortValue
    userId: IdType
    lat: number
    long: number
  }> &
  TasksFilterQueries &
  FastFilterQueries &
  FilterParams

export type GetTasksResponse = PaginationResponse<TaskListItemModel>
