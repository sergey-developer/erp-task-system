import { Moment } from 'moment'

import { FastFilterEnum } from 'modules/task/components/TaskList/constants/enums'
import { TaskStatusEnum } from 'modules/task/constants/enums'
import { MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'

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
  searchField: keyof SearchQueries
  searchValue: string
  status: TaskStatusEnum[]
  workGroupId: MaybeUndefined<string>
}
