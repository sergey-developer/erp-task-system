import { fakeIdStr } from '../../../utils'
import systemFixtures from '../../../fixtures/system'
import { RequestTaskSuspendModalProps } from 'modules/task/components/RequestTaskSuspendModal/types'

export const props: Readonly<RequestTaskSuspendModalProps> = {
  open: true,
  recordId: fakeIdStr(),
  systemSettings: systemFixtures.settings(),
  systemSettingsIsLoading: false,
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

export enum TestIdsEnum {
  RequestTaskSuspendModal = 'request-task-suspend-modal',
  ReasonFormItem = 'reason-form-item',
  TaskLinkFormItem = 'task-link-form-item',
  OrganizationFormItem = 'organization-form-item',
  ReturnTimeFormItem = 'return-time-form-item',
  EndDateFormItem = 'end-date-form-item',
  EndTimeFormItem = 'end-time-form-item',
  CommentFormItem = 'comment-form-item',
}
