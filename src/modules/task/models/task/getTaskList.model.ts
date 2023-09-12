import {
  FastFilterEnum,
  TaskExtendedStatusEnum,
  TaskAssignedEnum,
  TaskOverdueEnum,
} from 'modules/task/constants'
import { TaskListItemModel } from 'modules/task/models'

import { PaginatedListSuccessResponse } from 'shared/models/pagination.model'
import { IdType } from 'shared/types/common'
import { PaginationParams } from 'shared/types/pagination'
import { ExtendSortKey } from 'shared/types/sort'

export type GetTaskListSortKey =
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

export type GetTaskListSortValue = ExtendSortKey<GetTaskListSortKey>

export type FastFilterQueries = Partial<{
  filter: FastFilterEnum
}>

export type TaskIdFilterQueries = Partial<{
  taskId: string
}>

export type SearchFields = Partial<{
  searchByAssignee: string
  searchByName: string
  searchByTitle: string
}>

export type ExtendedFilterQueries = Partial<{
  completeAtFrom: string
  completeAtTo: string
  status: TaskExtendedStatusEnum[]
  isOverdue: TaskOverdueEnum[]
  isAssigned: TaskAssignedEnum[]
  workGroupId: IdType
  manager: IdType
}> &
  SearchFields

export type GetTaskListQueryArgs = Partial<
  PaginationParams & {
    sort: GetTaskListSortValue
    userId: IdType
    lat: number
    long: number
  }
> &
  ExtendedFilterQueries &
  FastFilterQueries &
  TaskIdFilterQueries

export type GetTaskListSuccessResponse = PaginatedListSuccessResponse<TaskListItemModel>
