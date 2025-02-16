import { RequestTaskSuspendModalProps } from 'features/tasks/components/RequestTaskSuspendModal/types'

import systemFixtures from '_tests_/fixtures/system/index'
import { fakeIdStr } from '_tests_/helpers'

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
