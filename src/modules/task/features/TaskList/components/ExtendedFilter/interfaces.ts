import { Moment } from 'moment/moment'

import { TaskStatusEnum } from 'modules/task/constants/enums'
import { Keys, MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'

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

export type ExtendedFilterFormFields = {
  olaNextBreachTimeRange: MaybeNull<[Moment, Moment]>
  searchField: Keys<SearchQueries>
  searchValue: string
  status: TaskStatusEnum[]
  workGroupId: MaybeUndefined<string>
}
