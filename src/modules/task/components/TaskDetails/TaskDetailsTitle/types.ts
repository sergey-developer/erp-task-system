import { TaskModel } from 'modules/task/models'

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
  onReloadTask: EmptyFn
  onExecuteTask: EmptyFn
  onRequestSuspend: EmptyFn
  onRequestReclassification: EmptyFn
  onChangeDescription: EmptyFn
}

export enum MenuActionsKeysEnum {
  RequestSuspend = 'RequestSuspend',
  ExecuteTask = 'ExecuteTask',
  RequestReclassification = 'RequestReclassification',
  CancelReclassification = 'CancelReclassification',
  ChangeDescription = 'ChangeDescription',
}
