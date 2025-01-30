import { AssigneeBlockProps } from 'features/task/components/TaskDetails/AssigneeBlock/index'
import { TaskActionsPermissionsEnum } from 'features/task/constants/task/index'
import { UserPermissionsEnum } from 'features/user/constants/index'

import { SetNonNullable } from 'shared/types/utils'

import taskFixtures from '_tests_/fixtures/task/index'
import userFixtures from '_tests_/fixtures/user/index'
import { fakeId } from '_tests_/utils'

export const props: Readonly<SetNonNullable<AssigneeBlockProps>> = {
  id: fakeId(),
  userActions: userFixtures.userActions(),
  takeTask: jest.fn(),
  takeTaskIsLoading: false,
  updateAssignee: jest.fn(),
  updateAssigneeIsLoading: false,
  assignee: taskFixtures.assignee(),
  workGroup: taskFixtures.workGroup(),
}

export const activeTakeTaskButtonProps: Readonly<Pick<AssigneeBlockProps, 'userActions'>> = {
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanExecute]: [props.id],
    },
  }),
}

export const activeAssignOnMeButtonProps: Readonly<
  Pick<AssigneeBlockProps, 'userActions'> & { permissions: UserPermissionsEnum[] }
> = {
  userActions: {
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanSelfAssignee]: [props.id],
    },
  },
  permissions: [
    UserPermissionsEnum.AnyAssigneeTasksUpdate,
    UserPermissionsEnum.SelfAssigneeTasksUpdate,
  ],
}

export const showRefuseTaskButtonProps: Readonly<
  SetNonNullable<Pick<AssigneeBlockProps, 'assignee'>>
> = {
  assignee: taskFixtures.assignee(),
}

export const activeRefuseTaskButtonProps: Readonly<Pick<AssigneeBlockProps, 'userActions'>> = {
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanSelfAssignee]: [props.id],
    },
  }),
}

export const canSelectAssigneeProps: Readonly<
  SetNonNullable<Pick<AssigneeBlockProps, 'userActions'> & { permissions: UserPermissionsEnum[] }>
> = {
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanAssignee]: [props.id],
    },
  }),
  permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
}

export enum TestIdsEnum {
  TaskAssigneeBlock = 'task-assignee-block',
}
