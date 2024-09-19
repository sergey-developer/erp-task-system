import { ExecuteTaskModalProps } from 'modules/task/components/ExecuteTaskModal/types'
import { TaskTypeEnum } from 'modules/task/constants/task'
import { fakeIdStr } from '../../../utils'
import taskFixtures from '../../../fixtures/task'

export const props: Readonly<ExecuteTaskModalProps> = {
  open: true,
  isLoading: false,

  type: TaskTypeEnum.Request,
  recordId: fakeIdStr(),
  supportGroup: taskFixtures.supportGroup(),

  onSubmit: jest.fn(),
  onCancel: jest.fn(),

  resolutionClassifications: [],
  resolutionClassificationsIsLoading: false,

  onGetAct: jest.fn(),
  getActIsLoading: false,
}

export const showResolutionClassifierFieldProps: Readonly<Pick<ExecuteTaskModalProps, 'supportGroup'>> = {
  supportGroup: taskFixtures.supportGroup({ hasResolutionClassifiers: true }),
}

export const hideResolutionClassifierFieldProps: Readonly<Pick<ExecuteTaskModalProps, 'supportGroup'>> = {
  supportGroup: taskFixtures.supportGroup({ hasResolutionClassifiers: false }),
}

export enum TestIdsEnum {
  ExecuteTaskModal = 'execute-task-modal',
  ResolutionClassificationFormItem = 'resolution-classification-form-item',
  TechResolution = 'tech-resolution',
  UserResolution = 'user-resolution',
  AttachmentsFormItem = 'attachments-form-item',
}
