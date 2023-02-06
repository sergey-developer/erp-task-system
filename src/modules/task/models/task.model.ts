import {
  BaseTaskModel,
  TaskAssigneeModel,
  TaskWorkGroupModel,
} from 'modules/task/models'
import { MaybeNull } from 'shared/interfaces/utils'

import { SuspendRequestModel } from './suspendRequest.model'

export type TaskModel = BaseTaskModel & {
  assignee: MaybeNull<TaskAssigneeModel>
  olaEstimatedTime: number
  suspendRequest: MaybeNull<SuspendRequestModel>

  weight?: number
  company?: string
  email?: string
  sapId?: string
  contactType?: string
  workGroup?: MaybeNull<TaskWorkGroupModel>
}
