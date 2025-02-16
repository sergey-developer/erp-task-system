import { TaskAssigneeProps } from 'features/tasks/components/TaskAssignee/index'

import userFixtures from '_tests_/fixtures/users/index'

const user = userFixtures.user()

export const props: TaskAssigneeProps = {
  ...user,
  position: user.position!.title,
  hasPopover: false,
}

export enum TestIdsEnum {
  TaskAssignee = 'task-assignee',
}
