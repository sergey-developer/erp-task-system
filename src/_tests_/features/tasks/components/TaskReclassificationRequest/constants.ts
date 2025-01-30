import { TaskReclassificationRequestProps } from 'features/task/components/TaskReclassificationRequest/index'

import userFixtures from '_tests_/fixtures/user/index'
import { fakeDateString, fakeWord } from '_tests_/utils'

export const props: Readonly<TaskReclassificationRequestProps> = {
  user: userFixtures.baseUser(),
  comment: fakeWord(),
  date: fakeDateString(),
  onCancel: jest.fn(),
  cancelBtnDisabled: false,
}

export enum TestIdsEnum {
  TaskReclassificationRequest = 'task-reclassification-request',
}
