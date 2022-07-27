import { SortEnum } from 'modules/task/constants/enums'
import { PaginatedListResponseModel } from 'shared/interfaces/models'

import {
  ExtendedFilterQueries,
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
