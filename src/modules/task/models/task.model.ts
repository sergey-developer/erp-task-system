import { BaseTaskModel, TaskAssigneeModel } from 'modules/task/models'

import { MaybeNull } from 'shared/interfaces/utils'

import { SuspendRequestModel } from './suspendRequest.model'

export type TaskModel = BaseTaskModel & {
  assignee: MaybeNull<TaskAssigneeModel>
  olaEstimatedTime: number
  suspendRequest: MaybeNull<SuspendRequestModel>
  weight: MaybeNull<number>
  company: MaybeNull<string>
  email: MaybeNull<string>
  sapId: MaybeNull<string>
  contactType: MaybeNull<string>
}
