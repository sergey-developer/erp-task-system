import {
  BaseTaskModel,
  TaskAttachmentModel,
  SuspendRequestModel,
} from 'modules/task/models'

import { MaybeNull } from 'shared/interfaces/utils'

export type TaskModel = BaseTaskModel & {
  attachments: Array<TaskAttachmentModel>
  olaEstimatedTime: number
  suspendRequest: MaybeNull<SuspendRequestModel>
  weight: MaybeNull<number>
  company: MaybeNull<string>
  email: MaybeNull<string>
  sapId: MaybeNull<string>
  contactType: MaybeNull<string>
  resolution: {
    attachments: Array<TaskAttachmentModel>
  }
}
