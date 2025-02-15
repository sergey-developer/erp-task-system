import { CreateTaskModalProps } from 'features/tasks/components/CreateTaskModal/types'

export const props: Readonly<CreateTaskModalProps> = {
  open: true,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
  confirmLoading: false,

  locations: [],
  locationsIsLoading: false,

  customers: [],
  customersIsLoading: false,

  workTypes: [],
  workTypesIsLoading: false,
  onChangeType: jest.fn(),

  observers: [],
  observersIsLoading: false,

  users: [],
  usersIsLoading: false,

  executors: [],
  executorsIsLoading: false,

  workGroups: [],
  workGroupsIsLoading: false,
  onChangeWorkGroup: jest.fn(),

  permissions: {},
}

export enum TestIdsEnum {
  Container = 'create-task-modal',
  AssigneeFormItem = 'assignee-form-item',
  CoExecutorsFormItem = 'co-executors-form-item',
  ObserversFormItem = 'observers-form-item',
}
