import { Moment } from 'moment'

import { FilterTagProps } from 'components/FilterTag'
import { FastFilterEnum, TaskStatusEnum } from 'modules/tasks/constants'
import { MaybeNull } from 'shared/interfaces/utils'

export type FilterListItem = Pick<FilterTagProps, 'text' | 'amount'> & {
  value: FastFilterEnum
}

export type SearchQueries = {
  searchByAssignee?: string
  searchByName?: string
  searchByTitle?: string
}

export type ExtendedFilterQueries = {
  dateFrom?: string
  dateTo?: string
  status?: TaskStatusEnum[]
  workGroupId?: number
} & SearchQueries

export type QuickFilterQueries = {
  filter?: FastFilterEnum
}

export type TaskIdFilterQueries = {
  taskId?: string
}

export type ExtendedFilterFormFields = {
  creationDateRange: MaybeNull<[Moment, Moment]>
  searchField: keyof SearchQueries
  searchValue: string
  status: TaskStatusEnum[]
  workGroupId: string
}
