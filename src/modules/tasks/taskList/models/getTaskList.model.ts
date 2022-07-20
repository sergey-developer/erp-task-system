import { SortEnum } from 'modules/tasks/constants'
import { PaginatedListResponseModel } from 'shared/interfaces/models'

import {
  ExtendedFilterQueries,
  QuickFilterQueries,
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
  QuickFilterQueries &
  TaskIdFilterQueries
