import { Moment } from 'moment-timezone'

import { SupportGroupListModel } from 'modules/supportGroup/models'
import {
  TaskExtendedStatusEnum,
  TaskAssignedEnum,
  TaskOverdueEnum,
} from 'modules/task/constants/task'
import { SearchFields } from 'modules/task/models'
import { CustomerListModel } from 'modules/warehouse/models'
import { WorkGroupListModel } from 'modules/workGroup/models'

import { MacroregionListModel } from 'shared/models/macroregion'
import { IdType } from 'shared/types/common'

export type ExtendedFilterSupportGroupFormFields = Partial<{
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
}>

export type ExtendedFilterFormFields = ExtendedFilterSupportGroupFormFields &
  Partial<{
    completeAt: Moment[]
    searchField: keyof SearchFields
    searchValue: string
    status: TaskExtendedStatusEnum[]
    isOverdue: TaskOverdueEnum[]
    isAssigned: TaskAssignedEnum[]
    workGroupId: IdType
    manager: IdType
  }>

export type ExtendedFilterProps = {
  formValues: ExtendedFilterFormFields
  initialFormValues: ExtendedFilterFormFields

  customerList: CustomerListModel
  customerListIsLoading: boolean
  onChangeCustomers: (value: IdType[]) => void

  macroregionList: MacroregionListModel
  macroregionListIsLoading: boolean
  onChangeMacroregions: (value: IdType[]) => void

  supportGroupList: SupportGroupListModel
  supportGroupListIsLoading: boolean

  /* закоменчено временно только для rc */
  // userList: UserListModel
  // userListIsLoading: boolean

  workGroupList: WorkGroupListModel
  workGroupListIsLoading: boolean

  onSubmit: (result: ExtendedFilterFormFields) => void
  onClose: () => void
}
