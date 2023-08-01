import {
  BaseTaskModel,
  SuspendRequestModel,
  TaskAttachmentListModel,
} from 'modules/task/models'

import { MaybeNull } from 'shared/types/utils'

export type TaskModel = BaseTaskModel & {
  attachments: MaybeNull<TaskAttachmentListModel>
  olaEstimatedTime: number
  suspendRequest: MaybeNull<SuspendRequestModel>
  weight: MaybeNull<number>
  company: MaybeNull<string>
  email: MaybeNull<string>
  sapId: MaybeNull<string>
  contactType: MaybeNull<string>
  resolution: {
    attachments: TaskAttachmentListModel
  }
}
