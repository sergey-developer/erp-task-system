import { TaskActionsPermissionsEnum } from 'features/tasks/api/constants'
import { AssigneeBlockProps } from 'features/tasks/components/TaskDetails/AssigneeBlock/index'
import { UserPermissionsEnum } from 'features/users/api/constants/index'

import { SetNonNullable } from 'shared/types/utils'

import tasksFixtures from '_tests_/fixtures/tasks/index'
import userFixtures from '_tests_/fixtures/users/index'
import { fakeId } from '_tests_/helpers'

export const props: Readonly<SetNonNullable<AssigneeBlockProps>> = {
  id: fakeId(),
  userActions: userFixtures.userActions(),
  takeTask: jest.fn(),
  takeTaskIsLoading: false,
  updateAssignee: jest.fn(),
  updateAssigneeIsLoading: false,
  assignee: tasksFixtures.taskAssignee(),
  workGroup: tasksFixtures.taskWorkGroup(),
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
  assignee: tasksFixtures.taskAssignee(),
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
