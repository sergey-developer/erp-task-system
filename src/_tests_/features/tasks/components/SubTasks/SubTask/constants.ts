import {
  SuspendRequestStatusEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'features/tasks/api/constants'
import { SubTaskProps } from 'features/tasks/components/SubTasks/SubTask'

import tasksFixtures from '_tests_/fixtures/tasks/index'

const task = tasksFixtures.taskDetail()
const subTask = tasksFixtures.subTask()

export const props: Readonly<SubTaskProps> = {
  title: subTask.title,
  status: subTask.status,
  taskExtendedStatus: task.extendedStatus,
  createdAt: subTask.createdAt,
  supportGroup: null,
  onClickCancel: jest.fn(),
  onClickRework: jest.fn(),
  taskStatus: TaskStatusEnum.New,
  currentUserIsTaskAssignee: false,
  returnReason: null,
  cancelReason: null,
  taskSuspendRequestStatus: SuspendRequestStatusEnum.Denied,
  recordId: subTask.recordId,
  description: subTask.description,
  techResolution: subTask.techResolution,
  olaNextBreachTime: subTask.olaNextBreachTime,
  externalAssigneeName: subTask.externalAssigneeName,
  externalAssigneePhone: subTask.externalAssigneePhone,
  permissions: {},
}

export const showReworkButtonProps: Pick<
  SubTaskProps,
  'currentUserIsTaskAssignee' | 'status' | 'taskStatus' | 'taskExtendedStatus'
> = {
  currentUserIsTaskAssignee: true,
  status: TaskStatusEnum.Completed,
  taskStatus: TaskStatusEnum.New,
  taskExtendedStatus: TaskExtendedStatusEnum.New,
}

export const activeReworkButtonProps: Pick<
  SubTaskProps,
  'taskSuspendRequestStatus' | 'taskExtendedStatus'
> = {
  taskSuspendRequestStatus: SuspendRequestStatusEnum.Denied,
  taskExtendedStatus: TaskExtendedStatusEnum.New,
}

export const showCancelButtonProps: Pick<
  SubTaskProps,
  'currentUserIsTaskAssignee' | 'status' | 'taskStatus' | 'taskExtendedStatus'
> = {
  currentUserIsTaskAssignee: true,
  status: TaskStatusEnum.New,
  taskStatus: TaskStatusEnum.New,
  taskExtendedStatus: TaskExtendedStatusEnum.New,
}

export const activeCancelButtonProps: Pick<
  SubTaskProps,
  'taskSuspendRequestStatus' | 'taskExtendedStatus'
> = {
  taskSuspendRequestStatus: SuspendRequestStatusEnum.Denied,
  taskExtendedStatus: TaskExtendedStatusEnum.New,
}

export enum TestIdsEnum {
  SubTaskListItem = 'sub-task-list-item',
}
