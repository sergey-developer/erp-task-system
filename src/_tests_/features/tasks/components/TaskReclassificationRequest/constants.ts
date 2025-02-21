import { TaskReclassificationRequestProps } from 'features/tasks/components/TaskReclassificationRequest/index'

import userFixtures from '_tests_/fixtures/api/data/users/index'
import { fakeDateString, fakeWord } from '_tests_/helpers'

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
