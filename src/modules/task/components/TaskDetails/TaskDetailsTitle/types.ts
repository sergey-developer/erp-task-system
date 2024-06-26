import { TaskModel } from 'modules/task/models'
import { UserActionsModel } from 'modules/user/models'

import { EmptyFn } from 'shared/types/utils'

export type TaskDetailsTitleProps = Pick<
  TaskModel,
  | 'id'
  | 'status'
  | 'extendedStatus'
  | 'olaStatus'
  | 'type'
  | 'workGroup'
  | 'assignee'
  | 'suspendRequest'
> & {
  userActions: UserActionsModel
  onReloadTask: EmptyFn
  onExecuteTask: EmptyFn
  onRegisterFN: EmptyFn
  onRequestSuspend: EmptyFn
  onRequestReclassification: EmptyFn
  onUpdateDescription: EmptyFn
  onUpdateDeadline: EmptyFn
}

export enum MenuActionsKeysEnum {
  RequestSuspend = 'RequestSuspend',
  RegisterFN = 'RegisterFN',
  ExecuteTask = 'ExecuteTask',
  RequestReclassification = 'RequestReclassification',
  CancelReclassification = 'CancelReclassification',
  UpdateDescription = 'UpdateDescription',
  UpdateDeadline = 'UpdateDeadline',
}
