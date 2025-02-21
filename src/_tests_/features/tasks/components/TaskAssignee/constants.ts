import { TaskAssigneeProps } from 'features/tasks/components/TaskAssignee/index'

import userFixtures from '_tests_/fixtures/api/data/users/index'

const user = userFixtures.userDetail()

export const props: TaskAssigneeProps = {
  ...user,
  position: user.position!.title,
  hasPopover: false,
}

export enum TestIdsEnum {
  TaskAssignee = 'task-assignee',
}
