import { AssigneeBlockProps } from 'modules/task/components/TaskDetails/AssigneeBlock/index'
import {
  TaskActionsPermissionsEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/task/index'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest/index'

import { SetNonNullable } from 'shared/types/utils'

import taskFixtures from '_tests_/fixtures/task/index'
import userFixtures from '_tests_/fixtures/user/index'
import { fakeId } from '_tests_/utils/index'

export const props: Readonly<SetNonNullable<AssigneeBlockProps>> = {
  id: fakeId(),
  userActions: userFixtures.userActions(),
  takeTask: jest.fn(),
  takeTaskIsLoading: false,
  updateAssignee: jest.fn(),
  updateAssigneeIsLoading: false,
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  assignee: taskFixtures.assignee(),
  workGroup: taskFixtures.workGroup(),
  taskSuspendRequestStatus: SuspendRequestStatusEnum.Denied,
}

export const activeTakeTaskButtonProps: Readonly<
  Pick<AssigneeBlockProps, 'assignee' | 'status' | 'extendedStatus' | 'userActions'>
> = {
  assignee: null,
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanExecute]: [props.id],
    },
  }),
}

export const activeAssignOnMeButtonProps: Readonly<
  Pick<AssigneeBlockProps, 'status' | 'extendedStatus'>
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

export const activeAssignButtonProps: Readonly<
  SetNonNullable<Pick<AssigneeBlockProps, 'status' | 'extendedStatus' | 'assignee'>>
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  assignee: taskFixtures.assignee(),
}

export const showRefuseTaskButtonProps: Readonly<
  SetNonNullable<Pick<AssigneeBlockProps, 'assignee'>>
> = {
  assignee: taskFixtures.assignee(),
}

export const activeRefuseTaskButtonProps: Readonly<
  Pick<AssigneeBlockProps, 'status' | 'extendedStatus'>
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

export const canSelectAssigneeProps: Readonly<
  SetNonNullable<Pick<AssigneeBlockProps, 'status' | 'workGroup'>>
> = {
  status: TaskStatusEnum.New,
  workGroup: taskFixtures.workGroup(),
}

export enum TestIdsEnum {
  TaskAssigneeBlock = 'task-assignee-block',
}
