import { SubTaskListProps } from 'modules/task/components/SubTaskList'
import { TaskExtendedStatusEnum, TaskStatusEnum } from 'modules/task/constants/task'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'

import taskFixtures from '../../../fixtures/task'

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
