import { Moment } from 'moment-timezone'

import { TaskExtendedStatusEnum } from 'modules/task/constants'

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
  status?: Array<TaskExtendedStatusEnum>
  isOverdue?: Array<TaskOverdueEnum>
  isAssigned?: Array<TaskAssignedEnum>
  workGroupId?: number
} & SearchFields

export type ExtendedFilterFormFields = {
  completeAt: MaybeNull<[Moment, Moment]>
  searchField: keyof SearchFields
  searchValue: string
  status: Array<TaskExtendedStatusEnum>
  isOverdue: Array<TaskOverdueEnum>
  isAssigned: Array<TaskAssignedEnum>
  workGroupId: MaybeUndefined<string>
}

export type ExtendedFilterProps = {
  formValues: ExtendedFilterFormFields
  initialFormValues: ExtendedFilterFormFields
  onSubmit: (result: ExtendedFilterFormFields) => void
  onClose: () => void
}
