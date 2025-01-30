import { TaskSuspendRequestProps } from 'features/task/components/TaskSuspendRequest/index'

import userFixtures from '_tests_/fixtures/user/index'
import { fakeDateString, fakeWord } from '_tests_/utils'

export const props: Readonly<Omit<TaskSuspendRequestProps, 'action'>> = {
  user: userFixtures.baseUser(),
  title: fakeWord(),
  comment: fakeWord(),
  date: fakeDateString(),
}

export enum TestIdsEnum {
  TaskDetailsSuspendRequest = 'task-details-suspend-request',
}
