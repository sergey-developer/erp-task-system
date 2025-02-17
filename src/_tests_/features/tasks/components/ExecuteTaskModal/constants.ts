import { TaskTypeEnum } from 'features/tasks/api/constants'
import { ExecuteTaskModalProps } from 'features/tasks/components/ExecuteTaskModal/types'

import tasksFixtures from '_tests_/fixtures/api/data/tasks/index'
import { fakeIdStr } from '_tests_/helpers'

export const props: Readonly<ExecuteTaskModalProps> = {
  open: true,
  isLoading: false,

  type: TaskTypeEnum.Request,
  recordId: fakeIdStr(),
  supportGroup: tasksFixtures.taskSupportGroup(),

  onSubmit: jest.fn(),
  onCancel: jest.fn(),

  resolutionClassifications: [],
  resolutionClassificationsIsLoading: false,

  onGetAct: jest.fn(),
  getActIsLoading: false,
}

export const showResolutionClassifierFieldProps: Readonly<
  Pick<ExecuteTaskModalProps, 'supportGroup'>
> = {
  supportGroup: tasksFixtures.taskSupportGroup({ hasResolutionClassifiers: true }),
}

export const hideResolutionClassifierFieldProps: Readonly<
  Pick<ExecuteTaskModalProps, 'supportGroup'>
> = {
  supportGroup: tasksFixtures.taskSupportGroup({ hasResolutionClassifiers: false }),
}

export enum TestIdsEnum {
  ExecuteTaskModal = 'execute-task-modal',
  ResolutionClassificationFormItem = 'resolution-classification-form-item',
  TechResolution = 'tech-resolution',
  UserResolution = 'user-resolution',
  AttachmentsFormItem = 'attachments-form-item',
}
