import { SubTaskListProps } from 'modules/task/components/SubTaskList/index'
import { TaskExtendedStatusEnum, TaskStatusEnum } from 'modules/task/constants/task/index'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest/index'

import taskFixtures from '_tests_/fixtures/task/index'

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
