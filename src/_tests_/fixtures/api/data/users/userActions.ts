import { TaskActionsPermissionsEnum } from 'features/tasks/api/constants'
import { UserActionsDTO } from 'features/users/api/dto'

import { fakeId } from '_tests_/helpers'

export const taskActionsPermissions: UserActionsDTO['tasks'] = {
  [TaskActionsPermissionsEnum.CanExecute]: [fakeId()],
  [TaskActionsPermissionsEnum.CanRead]: [fakeId()],
  [TaskActionsPermissionsEnum.CanSuspendRequestsCreate]: [fakeId()],
  [TaskActionsPermissionsEnum.CanPutOnFirstLine]: [fakeId()],
  [TaskActionsPermissionsEnum.CanReclassificationRequestsCreate]: [fakeId()],
  [TaskActionsPermissionsEnum.CanSubtasksCreate]: [fakeId()],
  [TaskActionsPermissionsEnum.CanPutOnSecondLine]: [fakeId()],
  [TaskActionsPermissionsEnum.CanResolve]: [fakeId()],
  [TaskActionsPermissionsEnum.CanAssignee]: [fakeId()],
}

export const userActions = (props?: Partial<UserActionsDTO>): UserActionsDTO => ({
  tasks: props?.tasks ? { ...taskActionsPermissions, ...props.tasks } : taskActionsPermissions,
})
