import { WorkGroupBlockProps } from 'modules/task/components/TaskDetails/WorkGroupBlock/index'
import {
  TaskActionsPermissionsEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/task/index'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest/index'

import taskFixtures from '_tests_/fixtures/task/index'
import userFixtures from '_tests_/fixtures/user/index'
import { fakeId, fakeIdStr } from '_tests_/utils/index'

export const props: Readonly<
  Omit<WorkGroupBlockProps, 'workGroup'> & {
    taskSuspendRequestStatus: SuspendRequestStatusEnum
  }
> = {
  id: fakeId(),
  type: TaskTypeEnum.Request,
  recordId: fakeIdStr(),
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  transferTaskToFirstLine: jest.fn(),
  transferTaskToFirstLineIsLoading: false,
  transferTaskToSecondLine: jest.fn(),
  transferTaskToSecondLineIsLoading: false,
  taskSuspendRequestStatus: SuspendRequestStatusEnum.Denied,
  userActions: userFixtures.userActions(),
}

// first line button
export const showFirstLineButtonProps: Pick<WorkGroupBlockProps, 'workGroup' | 'status'> = {
  workGroup: taskFixtures.workGroup(),
  status: TaskStatusEnum.New,
}

export const forceActiveFirstLineButtonProps: Pick<
  WorkGroupBlockProps,
  'userActions' | 'taskSuspendRequestStatus'
> = {
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanPutOnFirstLine]: [props.id],
    },
  }),
  taskSuspendRequestStatus: SuspendRequestStatusEnum.Approved,
}

export const activeFirstLineButtonProps: Pick<WorkGroupBlockProps, 'status' | 'extendedStatus'> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

export const disableFirstLineButtonProps: Pick<WorkGroupBlockProps, 'status'> = {
  status: TaskStatusEnum.Awaiting,
}

// second line button
export const showSecondLineButtonProps: Pick<WorkGroupBlockProps, 'workGroup'> = {
  workGroup: null,
}

export const activeSecondLineButtonProps: Pick<WorkGroupBlockProps, 'status' | 'extendedStatus'> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

export enum TestIdsEnum {
  TaskWorkGroup = 'task-work-group',
}
