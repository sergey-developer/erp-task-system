import { CreateSubTaskModalProps } from 'modules/task/components/CreateSubTaskModal/types'
import taskFixtures from '../../../fixtures/task'

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