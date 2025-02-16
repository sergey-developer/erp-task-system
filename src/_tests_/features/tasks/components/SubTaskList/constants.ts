import {
  SuspendRequestStatusEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'features/tasks/api/constants'
import { SubTaskListProps } from 'features/tasks/components/SubTaskList'

import taskFixtures from '_tests_/fixtures/tasks/index'

export const props: Readonly<SubTaskListProps> = {
  list: taskFixtures.subTaskList(),
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
  SubTaskList = 'sub-task-list',
}
