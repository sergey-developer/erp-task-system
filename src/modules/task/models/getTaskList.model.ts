import { PaginatedListSuccessResponse } from 'shared/models'

import { ExtendedFilterQueries } from '../features/ExtendedFilter/interfaces'
import { SortValue } from '../features/TaskTable/constants/sort'
import {
  FastFilterQueries,
  TaskIdFilterQueries,
} from '../pages/TaskListPage/interfaces'
import { TaskListItemModel } from './taskList.model'

export type GetTaskListSuccessResponse =
  PaginatedListSuccessResponse<TaskListItemModel>

export type GetTaskListQueryArgs = {
  limit: number
  offset: number
  sort: SortValue
  userId?: number
} & ExtendedFilterQueries &
  FastFilterQueries &
  TaskIdFilterQueries
