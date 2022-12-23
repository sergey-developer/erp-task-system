import { PaginatedListResponseModel } from 'shared/models'

import { ExtendedFilterQueries } from '../features/TaskList/components/ExtendedFilter/interfaces'
import {
  FastFilterQueries,
  TaskIdFilterQueries,
} from '../features/TaskList/components/TaskListPage/interfaces'
import { SortValue } from '../features/TaskList/components/TaskTable/constants/sort'
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
