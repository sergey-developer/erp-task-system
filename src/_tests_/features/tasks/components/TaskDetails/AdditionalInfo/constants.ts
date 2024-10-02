import pick from 'lodash/pick'

import { AdditionalInfoProps } from 'modules/task/components/TaskDetails/AdditionalInfo/index'
import { TaskStatusEnum } from 'modules/task/constants/task/index'

import taskFixtures from '_tests_/fixtures/task/index'
import { fakeWord } from '_tests_/utils/index'

export const props: Readonly<
  AdditionalInfoProps & {
    onExpand: jest.MockedFn<AdditionalInfoProps['onExpand']>
  }
> = {
  permissions: {},
  expanded: true,
  onExpand: jest.fn(),
  severity: fakeWord(),
  priority: fakeWord(),
  impact: fakeWord(),
  productClassifier1: fakeWord(),
  productClassifier2: fakeWord(),
  productClassifier3: fakeWord(),
  status: TaskStatusEnum.New,
  workGroup: taskFixtures.workGroup(),

  parentTask: pick(taskFixtures.task(), 'id', 'recordId'),
  openParentTask: jest.fn(),

  address: null,
  longitude: null,
  latitude: null,
  weight: null,
  email: null,
  sapId: null,
  company: null,
  contactType: null,
  workType: null,
  supportGroup: undefined,
  toggleEditWorkType: jest.fn(),
  onSaveWorkType: jest.fn(),
  saveWorkTypeIsLoading: false,
  workTypes: [],
  workTypesIsLoading: false,
}

export enum TestIdsEnum {
  TaskDetailsAdditionalInfo = 'task-details-additional-info',
  AdditionalInfoContent = 'additional-info-content',
  AdditionalInfoAddress = 'additional-info-address',
}
