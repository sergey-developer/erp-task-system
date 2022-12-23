import { PaginatedListResponseModel } from 'shared/models'

import { ExtendedFilterQueries } from '../features/TaskList/ExtendedFilter/interfaces'
import {
  FastFilterQueries,
  TaskIdFilterQueries,
} from '../features/TaskList/TaskListPage/interfaces'
import { SortValue } from '../features/TaskList/TaskTable/constants/sort'
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
