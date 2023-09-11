import { Moment } from 'moment-timezone'

import { TaskExtendedStatusEnum } from 'modules/task/constants'
import { UserListModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { TaskAssignedEnum, TaskOverdueEnum } from './constants'

export type SearchFields = Partial<{
  searchByAssignee: string
  searchByName: string
  searchByTitle: string
}>

export type ExtendedFilterQueries = Partial<{
  completeAtFrom: string
  completeAtTo: string
  status: TaskExtendedStatusEnum[]
  isOverdue: TaskOverdueEnum[]
  isAssigned: TaskAssignedEnum[]
  workGroupId: IdType
  manager: IdType
}> &
  SearchFields

export type ExtendedFilterFormFields = {
  completeAt: MaybeNull<[Moment, Moment]>
  searchField: keyof SearchFields
  searchValue: string
  status: TaskExtendedStatusEnum[]
  isOverdue: TaskOverdueEnum[]
  isAssigned: TaskAssignedEnum[]
  workGroupId?: string
  manager?: IdType
}

export type ExtendedFilterProps = {
  formValues: ExtendedFilterFormFields
  initialFormValues: ExtendedFilterFormFields

  userList: UserListModel
  userListIsLoading: boolean

  onSubmit: (result: ExtendedFilterFormFields) => void
  onClose: () => void
}
