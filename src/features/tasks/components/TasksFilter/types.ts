import { TasksSearchFields } from 'features/tasks/api/schemas'
import {
  TaskAssignedEnum,
  TaskExtendedStatusEnum,
  TaskOverdueEnum,
} from 'features/tasks/api/constants'
import { UsersDTO } from 'features/users/api/dto'
import { MatchedUserPermissions } from 'features/users/types'
import { Moment } from 'moment-timezone'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { IdType } from 'shared/types/common'
import { WorkGroupsDTO } from 'shared/workGroups/api/dto'
import { MacroregionsCatalogDTO } from 'shared/catalogs/macroregions/api/dto'
import { CustomersCatalogDTO } from "shared/catalogs/customers/api/dto";
import { SupportGroupsDTO } from "shared/supportGroups/api/dto";

export type TasksFilterSupportGroupFormFields = Partial<{
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
}>

export type TasksFilterFormFields = TasksFilterSupportGroupFormFields &
  Partial<{
    completeAt: Moment[]
    creationDate: Moment[]
    searchField: keyof TasksSearchFields
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

  customers: CustomersCatalogDTO
  customersIsLoading: boolean
  onChangeCustomers: (value: IdType[]) => void

  macroregions: MacroregionsCatalogDTO
  macroregionsIsLoading: boolean
  onChangeMacroregions: (value: IdType[]) => void

  supportGroups: SupportGroupsDTO
  supportGroupsIsLoading: boolean

  users: UsersDTO
  usersIsLoading: boolean

  workGroups: WorkGroupsDTO
  workGroupsIsLoading: boolean

  onSubmit: (values: TasksFilterFormFields) => void
}
