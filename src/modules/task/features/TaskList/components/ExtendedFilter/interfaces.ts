import { Moment } from 'moment/moment'

import { TaskStatusEnum } from 'modules/task/constants/common'
import { MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'

import { TaskAssignedEnum, TaskOverdueEnum } from './constants'

export type SearchFields = Partial<{
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
} & SearchFields

export type ExtendedFilterFormFields = {
  completeAt: MaybeNull<[Moment, Moment]>
  searchField: keyof SearchFields
  searchValue: string
  status: Array<TaskStatusEnum>
  isOverdue: Array<TaskOverdueEnum>
  isAssigned: Array<TaskAssignedEnum>
  workGroupId: MaybeUndefined<string>
}
