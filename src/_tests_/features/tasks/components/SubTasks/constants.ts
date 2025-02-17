import {
  SuspendRequestStatusEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'features/tasks/api/constants'
import { SubTasksProps } from 'features/tasks/components/SubTasks'

import tasksFixtures from '_tests_/fixtures/tasks/index'

export const props: Readonly<SubTasksProps> = {
  list: tasksFixtures.subTaskList(),
  isError: false,
  taskStatus: TaskStatusEnum.New,
  taskExtendedStatus: TaskExtendedStatusEnum.New,
  currentUserIsTaskAssignee: false,
  onClickCancel: jest.fn(),
  onClickRework: jest.fn(),
  taskSuspendRequestStatus: SuspendRequestStatusEnum.Denied,
  permissions: {},
}

export enum TestIdsEnum {
  SubTasks = 'sub-task-list',
}
