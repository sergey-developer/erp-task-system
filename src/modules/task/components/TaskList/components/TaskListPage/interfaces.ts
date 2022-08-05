import { Moment } from 'moment'

import { FilterTagProps } from 'components/FilterTag'
import { FastFilterEnum } from 'modules/task/components/TaskList/constants/enums'
import { TaskStatusEnum } from 'modules/task/constants/enums'
import { Keys, MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'

export type FilterListItem = Pick<FilterTagProps, 'text' | 'amount'> & {
  value: FastFilterEnum
}

export type SearchQueries = Partial<{
  searchByAssignee: string
  searchByName: string
  searchByTitle: string
}>

export type ExtendedFilterQueries = {
  dateFrom?: string
  dateTo?: string
  status?: TaskStatusEnum[]
  workGroupId?: number
} & SearchQueries

export type FastFilterQueries = {
  filter?: MaybeNull<FastFilterEnum>
}

export type TaskIdFilterQueries = {
  taskId?: string
}

export type ExtendedFilterFormFields = {
  creationDateRange: MaybeNull<[Moment, Moment]>
  searchField: Keys<SearchQueries>
  searchValue: string
  status: TaskStatusEnum[]
  workGroupId: MaybeUndefined<string>
}
