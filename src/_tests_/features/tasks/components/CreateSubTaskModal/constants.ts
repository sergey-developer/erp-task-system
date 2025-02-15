import { CreateSubTaskModalProps } from 'features/tasks/components/CreateSubTaskModal/types'

import taskFixtures from '_tests_/fixtures/task/index'

export const onCancel = jest.fn()

export const props: Readonly<CreateSubTaskModalProps> = {
  task: taskFixtures.task(),
  onCancel,
}

export enum TestIdsEnum {
  CreateSubTaskModal = 'create-sub-task-modal',
  SupportGroupFormItem = 'support-group-form-item',
  ServiceFormItem = 'service-form-item',
  TitleFormItem = 'title-form-item',
  DescriptionFormItem = 'description-form-item',
}
