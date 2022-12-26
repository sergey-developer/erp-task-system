import { PaginatedListResponseModel } from 'shared/models'

import { ExtendedFilterQueries } from '../features/ExtendedFilter/interfaces'
import { SortValue } from '../features/TaskTable/constants/sort'
import {
  FastFilterQueries,
  TaskIdFilterQueries,
} from '../pages/TaskListPage/interfaces'
import { TaskListItemModel } from './taskList.model'

export type GetTaskListResponseModel =
  PaginatedListResponseModel<TaskListItemModel>

export type GetTaskListQueryArgsModel = {
  limit: number
  offset: number
  sort: SortValue
  userId?: number
} & ExtendedFilterQueries &
  FastFilterQueries &
  TaskIdFilterQueries
