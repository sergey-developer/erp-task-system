import { PaginatedListResponseModel } from 'shared/models'

import { ExtendedFilterQueries } from '../components/ExtendedFilter/interfaces'
import {
  FastFilterQueries,
  TaskIdFilterQueries,
} from '../components/TaskListPage/interfaces'
import { SortValue } from '../components/TaskTable/constants/sort'
import { TaskListItemModel } from './taskList.model'

export type GetTaskListResponseModel =
  PaginatedListResponseModel<TaskListItemModel>

export type GetTaskListQueryArgsModel = {
  hideAwaitingTask?: boolean
  limit: number
  offset: number
  sort: SortValue
  userId?: number
} & ExtendedFilterQueries &
  FastFilterQueries &
  TaskIdFilterQueries
