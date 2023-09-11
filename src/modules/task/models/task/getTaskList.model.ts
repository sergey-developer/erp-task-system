import { ExtendedFilterQueries } from 'modules/task/components/ExtendedFilter/types'
import { SortValue } from 'modules/task/components/TaskTable/constants/sort'
import { TaskListItemModel } from 'modules/task/models'
import { FastFilterQueries, TaskIdFilterQueries } from 'modules/task/pages/TaskListPage/types'

import { PaginatedListSuccessResponse } from 'shared/models/pagination.model'
import { IdType } from 'shared/types/common'
import { PaginationParams } from 'shared/types/pagination'

export type GetTaskListSuccessResponse = PaginatedListSuccessResponse<TaskListItemModel>

export type GetTaskListQueryArgs = Partial<
  PaginationParams & {
    sort: SortValue
    userId: IdType
    lat: number
    long: number
  }
> /** вынести типы ниже сюда */ &
  ExtendedFilterQueries &
  FastFilterQueries &
  TaskIdFilterQueries
