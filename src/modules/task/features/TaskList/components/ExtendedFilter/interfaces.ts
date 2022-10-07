import { Moment } from 'moment/moment'

import {
  TaskAssignedEnum,
  TaskOverdueEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'

export type SearchQueries = Partial<{
  searchByAssignee: string
  searchByName: string
  searchByTitle: string
}>

export type ExtendedFilterQueries = {
  completeAtFrom?: string
  completeAtTo?: string
  status?: Array<TaskStatusEnum>
  isOverdue?: Array<TaskOverdueEnum>
  isAssigned?: Array<TaskAssignedEnum>
  workGroupId?: number
} & SearchQueries

export type ExtendedFilterFormFields = {
  completeAt: MaybeNull<[Moment, Moment]>
  searchField: keyof SearchQueries
  searchValue: string
  status: Array<TaskStatusEnum>
  isOverdue: Array<TaskOverdueEnum>
  isAssigned: Array<TaskAssignedEnum>
  workGroupId: MaybeUndefined<string>
}
