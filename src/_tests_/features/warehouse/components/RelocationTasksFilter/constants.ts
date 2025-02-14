import { RelocationTasksFilterProps } from 'features/relocationTasks/components/RelocationTasksFilter/types'

export const props: Readonly<RelocationTasksFilterProps> = {
  open: true,

  values: {},
  initialValues: {},

  users: [],
  usersIsLoading: false,

  locations: [],
  locationsIsLoading: false,

  onClose: jest.fn(),
  onApply: jest.fn(),
}

export enum TestIdsEnum {
  RelocationTasksFilter = 'relocation-tasks-filter',
  StatusBlock = 'status-block',
  StatusSelect = 'status-select',
  TypeBlock = 'type-block',
  TypeSelect = 'type-select',
}
