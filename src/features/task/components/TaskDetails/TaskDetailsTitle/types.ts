import { TaskModel } from 'features/task/models'
import { UserActionsDTO } from 'features/users/api/dto'

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
  | 'system'
> & {
  userActions: UserActionsDTO
  onReloadTask: EmptyFn
  onExecuteTask: EmptyFn
  onRegisterFN: EmptyFn
  onRequestSuspend: EmptyFn
  onRequestReclassification: EmptyFn
  onUpdateDescription: EmptyFn
  onUpdateDeadline: EmptyFn
  onCreateInternalTask: EmptyFn
}

export enum MenuActionsKeysEnum {
  RequestSuspend = 'RequestSuspend',
  RegisterFN = 'RegisterFN',
  CreateInternalTask = 'CreateInternalTask',
  ExecuteTask = 'ExecuteTask',
  RequestReclassification = 'RequestReclassification',
  CancelReclassification = 'CancelReclassification',
  UpdateDescription = 'UpdateDescription',
  UpdateDeadline = 'UpdateDeadline',
}
