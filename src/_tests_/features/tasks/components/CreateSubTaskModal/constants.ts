import { CreateSubTaskModalProps } from 'features/tasks/components/CreateSubTaskModal/types'

import tasksFixtures from '_tests_/fixtures/api/data/tasks/index'

export const onCancel = jest.fn()

export const props: Readonly<CreateSubTaskModalProps> = {
  task: tasksFixtures.taskDetail(),
  onCancel,
}

export enum TestIdsEnum {
  CreateSubTaskModal = 'create-sub-task-modal',
  SupportGroupFormItem = 'support-group-form-item',
  ServiceFormItem = 'service-form-item',
  TitleFormItem = 'title-form-item',
  DescriptionFormItem = 'description-form-item',
}
