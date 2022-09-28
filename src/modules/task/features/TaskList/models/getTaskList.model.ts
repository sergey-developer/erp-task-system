import { SortEnum } from 'modules/task/features/TaskList/constants/common'
import { PaginatedListResponseModel } from 'shared/models'

import { ExtendedFilterQueries } from '../components/ExtendedFilter/interfaces'
import {
  FastFilterQueries,
  TaskIdFilterQueries,
} from '../components/TaskListPage/interfaces'
import { TaskListItemModel } from './taskList.model'

export type GetTaskListResponseModel =
  PaginatedListResponseModel<TaskListItemModel>

export type GetTaskListQueryArgsModel = {
  hideAwaitingTask?: boolean
  limit: number
  offset: number
  sort?: SortEnum
  userId?: number
} & ExtendedFilterQueries &
  FastFilterQueries &
  TaskIdFilterQueries
