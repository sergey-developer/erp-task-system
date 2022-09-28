import { Moment } from 'moment/moment'

import {
  TaskExtraStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
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
  isAssigned?: TaskExtraStatusEnum[]
  workGroupId?: number
} & SearchQueries

export type ExtendedFilterFormFields = {
  olaNextBreachTimeRange: MaybeNull<[Moment, Moment]>
  searchField: keyof SearchQueries
  searchValue: string
  status: Array<TaskStatusEnum | TaskExtraStatusEnum>
  workGroupId: MaybeUndefined<string>
}
