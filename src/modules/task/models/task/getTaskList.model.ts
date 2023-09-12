import { ExtendedFilterQueries } from 'modules/task/components/ExtendedFilter/types'
import { TaskListItemModel } from 'modules/task/models'
import { FastFilterQueries, TaskIdFilterQueries } from 'modules/task/pages/TaskListPage/types'

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

export type GetTaskListQueryArgs = Partial<
  PaginationParams & {
    sort: GetTaskListSortValue
    userId: IdType
    lat: number
    long: number
  }
> /** вынести типы ниже сюда */ &
  ExtendedFilterQueries &
  FastFilterQueries &
  TaskIdFilterQueries

export type GetTaskListSuccessResponse = PaginatedListSuccessResponse<TaskListItemModel>
