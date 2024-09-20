import { TaskDetailsTitleProps } from 'modules/task/components/TaskDetails/TaskDetailsTitle/types'
import {
  TaskActionsPermissionsEnum,
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/task/index'

import { SystemEnum } from 'shared/constants/enums'

import taskFixtures from '_tests_/fixtures/task/index'
import userFixtures from '_tests_/fixtures/user/index'
import { fakeId } from '_tests_/utils/index'

export const props: Readonly<TaskDetailsTitleProps> = {
  id: fakeId(),
  type: TaskTypeEnum.Request,
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  olaStatus: TaskOlaStatusEnum.NotExpired,
  assignee: null,
  workGroup: null,
  suspendRequest: null,
  system: SystemEnum.ITSM,
  userActions: userFixtures.userActions(),
  onExecuteTask: jest.fn(),
  onRegisterFN: jest.fn(),
  onReloadTask: jest.fn(),
  onRequestSuspend: jest.fn(),
  onRequestReclassification: jest.fn(),
  onUpdateDescription: jest.fn(),
  onUpdateDeadline: jest.fn(),
  onCreateInternalTask: jest.fn(),
}

export const canExecuteTaskProps: Pick<TaskDetailsTitleProps, 'userActions'> = {
  userActions: {
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanResolve]: [props.id],
    },
  },
}

export const showRequestReclassificationItemProps: Readonly<
  Pick<TaskDetailsTitleProps, 'extendedStatus'>
> = {
  extendedStatus: TaskExtendedStatusEnum.New,
}

export const hideRequestReclassificationItemProps: Readonly<
  Pick<TaskDetailsTitleProps, 'extendedStatus'>
> = {
  extendedStatus: TaskExtendedStatusEnum.InReclassification,
}

export const activeRequestReclassificationItemProps: Readonly<
  Pick<TaskDetailsTitleProps, 'olaStatus' | 'type' | 'suspendRequest' | 'userActions'>
> = {
  olaStatus: TaskOlaStatusEnum.NotExpired,
  type: TaskTypeEnum.Request,
  suspendRequest: null,
  userActions: {
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanReclassificationRequestsCreate]: [props.id],
    },
  },
}

export const activeRequestSuspendItemProps: Readonly<
  Pick<
    TaskDetailsTitleProps,
    'status' | 'extendedStatus' | 'type' | 'suspendRequest' | 'userActions'
  >
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  type: TaskTypeEnum.Request,
  suspendRequest: null,
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanSuspendRequestsCreate]: [props.id],
    },
  }),
}

export const canRegisterFNItemProps: Readonly<
  Pick<TaskDetailsTitleProps, 'status' | 'type' | 'workGroup' | 'assignee'>
> = {
  status: TaskStatusEnum.InProgress,
  type: TaskTypeEnum.Request,
  workGroup: taskFixtures.workGroup(),
  assignee: taskFixtures.assignee(),
}

export enum TestIdsEnum {
  TaskDetailsTitle = 'task-details-title',
}
