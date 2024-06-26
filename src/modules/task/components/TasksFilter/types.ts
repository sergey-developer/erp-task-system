import { Moment } from 'moment-timezone'

import { SupportGroupListModel } from 'modules/supportGroup/models'
import {
  TaskAssignedEnum,
  TaskExtendedStatusEnum,
  TaskOverdueEnum,
} from 'modules/task/constants/task'
import { SearchFields } from 'modules/task/models'
import { UsersModel } from 'modules/user/models'
import { MatchedUserPermissions } from 'modules/user/utils'
import { CustomerListModel } from 'modules/warehouse/models'
import { WorkGroupListModel } from 'modules/workGroup/models'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { MacroregionsModel } from 'shared/models/macroregion'
import { IdType } from 'shared/types/common'

export type TasksFilterSupportGroupFormFields = Partial<{
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
}>

export type TasksFilterFormFields = TasksFilterSupportGroupFormFields &
  Partial<{
    completeAt: Moment[]
    creationDate: Moment[]
    searchField: keyof SearchFields
    searchValue: string
    status: TaskExtendedStatusEnum[]
    isOverdue: TaskOverdueEnum[]
    isAssigned: TaskAssignedEnum[]
    workGroupId: IdType
    manager: IdType
  }>

export type TasksFilterProps = Required<Pick<DrawerFilterProps, 'open' | 'onClose'>> & {
  permissions: MatchedUserPermissions

  formValues: TasksFilterFormFields
  initialFormValues: TasksFilterFormFields

  customers: CustomerListModel
  customersIsLoading: boolean
  onChangeCustomers: (value: IdType[]) => void

  macroregions: MacroregionsModel
  macroregionsIsLoading: boolean
  onChangeMacroregions: (value: IdType[]) => void

  supportGroups: SupportGroupListModel
  supportGroupsIsLoading: boolean

  users: UsersModel
  usersIsLoading: boolean

  workGroups: WorkGroupListModel
  workGroupsIsLoading: boolean

  onSubmit: (values: TasksFilterFormFields) => void
}
