import {
  TaskAssignedEnum,
  TaskExtendedStatusEnum,
  TaskOverdueEnum,
  TasksFastFilterEnum,
} from 'features/tasks/api/constants'
import { TaskDTO } from 'features/tasks/api/dto'

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

export type TasksFastFilterRequestArgs = Partial<{
  filters: TasksFastFilterEnum[]
}>

export type TasksSearchFields = Partial<{
  searchByAssignee: string
  searchByName: string
  searchByTitle: string
}>

export type TasksFilterRequestArgs = Partial<{
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
  TasksSearchFields

export type GetTasksRequest = PaginationRequestParams &
  Partial<{
    sort: GetTasksSortValue
    userId: IdType
    lat: number
    long: number
  }> &
  TasksFilterRequestArgs &
  TasksFastFilterRequestArgs &
  FilterParams

export type GetTasksResponse = PaginationResponse<TaskDTO>
