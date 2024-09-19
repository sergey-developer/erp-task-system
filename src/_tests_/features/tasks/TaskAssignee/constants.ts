import { TaskAssigneeProps } from 'modules/task/components/TaskAssignee'

import userFixtures from '../../../fixtures/user'

const user = userFixtures.user()

export const props: TaskAssigneeProps = {
  ...user,
  position: user.position!.title,
  hasPopover: false,
}

export enum TestIdsEnum {
  TaskAssignee = 'task-assignee',
}
