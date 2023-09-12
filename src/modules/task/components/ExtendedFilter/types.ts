import { Moment } from 'moment-timezone'

import { TaskExtendedStatusEnum, TaskAssignedEnum, TaskOverdueEnum } from 'modules/task/constants'
import { SearchFields } from 'modules/task/models'
import { UserListModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

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
