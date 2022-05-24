import { Moment } from 'moment'

import { FilterTagProps } from 'components/FilterTag'
import { FastFilterEnum, TaskStatusEnum } from 'modules/tasks/constants'
import { MaybeNull } from 'shared/interfaces/utils'

export type FilterListItem = Pick<FilterTagProps, 'text' | 'amount'> & {
  value: FastFilterEnum
}

export enum SORT_DIRECTIONS {
  ascend = 'ascend',
  descend = 'descend',
}

export type SmartSearchQueries = {
  smartSearchAssignee?: string
  smartSearchDescription?: string
  smartSearchName?: string
}

export type ExtendedFilterQueries = {
  dateFrom?: string
  dateTo?: string
  status?: TaskStatusEnum[]
} & SmartSearchQueries

export type QuickFilterQueries = {
  filter?: FastFilterEnum
}

export type TaskIdFilterQueries = {
  taskId?: string
}

export type ExtendedFilterFormFields = {
  creationDateRange: MaybeNull<[Moment, Moment]>
  smartSearchField: keyof SmartSearchQueries
  smartSearchValue: string
  status: TaskStatusEnum[]
}
