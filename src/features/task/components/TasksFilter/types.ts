import { SupportGroupListModel } from 'features/supportGroup/models'
import {
  TaskAssignedEnum,
  TaskExtendedStatusEnum,
  TaskOverdueEnum,
} from 'features/task/constants/task'
import { SearchFields } from 'features/task/models'
import { UsersModel } from 'features/user/models'
import { MatchedUserPermissions } from 'features/user/types'
import { CustomersModel } from 'features/warehouse/models'
import { Moment } from 'moment-timezone'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { MacroregionsCatalogDTO } from 'shared/catalogs/api/dto/macroregions'
import { IdType } from 'shared/types/common'
import { WorkGroupsDTO } from 'shared/workGroups/api/dto'

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

  customers: CustomersModel
  customersIsLoading: boolean
  onChangeCustomers: (value: IdType[]) => void

  macroregions: MacroregionsCatalogDTO
  macroregionsIsLoading: boolean
  onChangeMacroregions: (value: IdType[]) => void

  supportGroups: SupportGroupListModel
  supportGroupsIsLoading: boolean

  users: UsersModel
  usersIsLoading: boolean

  workGroups: WorkGroupsDTO
  workGroupsIsLoading: boolean

  onSubmit: (values: TasksFilterFormFields) => void
}
