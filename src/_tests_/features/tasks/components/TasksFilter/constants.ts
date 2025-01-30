import { TasksFilterProps } from 'features/task/components/TasksFilter/types'
import { getInitialTasksFilterValues } from 'features/task/pages/TasksPage/utils'

export const props: Readonly<TasksFilterProps> = {
  open: true,

  permissions: {},

  formValues: getInitialTasksFilterValues(),
  initialFormValues: getInitialTasksFilterValues(),

  users: [],
  usersIsLoading: false,

  workGroups: [],
  workGroupsIsLoading: false,

  customers: [],
  customersIsLoading: false,
  onChangeCustomers: jest.fn(),

  macroregions: [],
  macroregionsIsLoading: false,
  onChangeMacroregions: jest.fn(),

  supportGroups: [],
  supportGroupsIsLoading: false,

  onClose: jest.fn(),
  onSubmit: jest.fn(),
}

export enum TestIdsEnum {
  ExtendedFilter = 'extended-filter',
  SupportGroupBlock = 'support-group-block',
  CustomersFormItem = 'customers-form-item',
  MacroregionsFormItem = 'macroregions-form-item',
  SupportGroupsFormItem = 'support-groups-form-item',
  StatusBlock = 'status-block',
  AssignedBlock = 'is-assigned-block',
  OverdueBlock = 'is-overdue-block',
  CompleteAtBlock = 'complete-at-block',
  CreationDateBlock = 'creation-date-block',
  WorkGroupBlock = 'work-group-block',
  WorkGroupSelect = 'work-group-select',
  ManagerBlock = 'manager-block',
  ManagerSelect = 'manager-select',
  SearchByColumnBlock = 'search-by-column-block',
}
