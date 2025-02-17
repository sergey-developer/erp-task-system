import { TaskStatusEnum } from 'features/tasks/api/constants'
import { AdditionalInfoProps } from 'features/tasks/components/TaskDetails/AdditionalInfo/index'
import pick from 'lodash/pick'

import tasksFixtures from '_tests_/fixtures/api/data/tasks/index'
import { fakeWord } from '_tests_/helpers'

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
  workGroup: tasksFixtures.taskWorkGroup(),

  parentTask: pick(tasksFixtures.taskDetail(), 'id', 'recordId'),
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
