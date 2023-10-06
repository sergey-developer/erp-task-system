import { Moment } from 'moment-timezone'

import { SupportGroupListModel } from 'modules/supportGroup/models'
import {
  TaskExtendedStatusEnum,
  TaskAssignedEnum,
  TaskOverdueEnum,
} from 'modules/task/constants/task'
import { SearchFields } from 'modules/task/models'
import { UserListModel } from 'modules/user/models'
import { CustomerListModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type ExtendedFilterFormFields = {
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
  completeAt: Moment[]
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

  customerList: CustomerListModel
  customerListIsLoading: boolean

  macroregionList: any[]
  macroregionListIsLoading: boolean

  supportGroupList: SupportGroupListModel
  supportGroupListIsLoading: boolean

  userList: UserListModel
  userListIsLoading: boolean

  onSubmit: (result: ExtendedFilterFormFields) => void
  onClose: () => void
}
