import { ExtendedFilterQueries } from 'modules/task/components/ExtendedFilter/interfaces'
import { SortValue } from 'modules/task/components/TaskTable/constants/sort'
import { TaskListItemModel } from 'modules/task/models'
import {
  FastFilterQueries,
  TaskIdFilterQueries,
} from 'modules/task/pages/TaskListPage/interfaces'

import { PaginatedListSuccessResponse } from 'shared/models'

export type GetTaskListSuccessResponse =
  PaginatedListSuccessResponse<TaskListItemModel>

export type GetTaskListQueryArgs = Partial<{
  limit: number
  offset: number
  sort: SortValue
  userId: number
  lat: number
  long: number
}> &
  ExtendedFilterQueries &
  FastFilterQueries &
  TaskIdFilterQueries
