import { TaskActionsPermissionsEnum } from 'modules/task/constants/task'
import { UserActionsModel } from 'modules/user/models'

import { fakeId } from '_tests_/utils'

export const taskActionsPermissions: UserActionsModel['tasks'] = {
  [TaskActionsPermissionsEnum.CanExecute]: [fakeId()],
  [TaskActionsPermissionsEnum.CanRead]: [fakeId()],
  [TaskActionsPermissionsEnum.CanSuspendRequestsCreate]: [fakeId()],
  [TaskActionsPermissionsEnum.CanPutOnFirstLine]: [fakeId()],
  [TaskActionsPermissionsEnum.CanReclassificationRequestsCreate]: [fakeId()],
  [TaskActionsPermissionsEnum.CanSubtasksCreate]: [fakeId()],
  [TaskActionsPermissionsEnum.CanPutOnSecondLine]: [fakeId()],
}

export const userActions = (props?: Partial<UserActionsModel>): UserActionsModel => ({
  tasks: props?.tasks ? { ...taskActionsPermissions, ...props.tasks } : taskActionsPermissions,
})
