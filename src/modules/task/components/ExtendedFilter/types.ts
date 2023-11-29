import { Moment } from 'moment-timezone'

import { SupportGroupListModel } from 'modules/supportGroup/models'
import {
  TaskAssignedEnum,
  TaskExtendedStatusEnum,
  TaskOverdueEnum,
} from 'modules/task/constants/task'
import { SearchFields } from 'modules/task/models'
import { UserListModel } from 'modules/user/models'
import { CustomerListModel } from 'modules/warehouse/models'
import { WorkGroupListModel } from 'modules/workGroup/models'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { MacroregionListModel } from 'shared/models/macroregion'
import { IdType } from 'shared/types/common'

export type TasksFilterSupportGroupFormFields = Partial<{
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
}>

export type TasksFilterFormFields = TasksFilterSupportGroupFormFields &
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

export type TasksFilterProps = Required<Pick<DrawerFilterProps, 'open' | 'onClose'>> & {
  formValues: TasksFilterFormFields
  initialFormValues: TasksFilterFormFields

  customerList: CustomerListModel
  customerListIsLoading: boolean
  onChangeCustomers: (value: IdType[]) => void

  macroregionList: MacroregionListModel
  macroregionListIsLoading: boolean
  onChangeMacroregions: (value: IdType[]) => void

  supportGroupList: SupportGroupListModel
  supportGroupListIsLoading: boolean

  userList: UserListModel
  userListIsLoading: boolean

  workGroupList: WorkGroupListModel
  workGroupListIsLoading: boolean

  onSubmit: (values: TasksFilterFormFields) => void
}
