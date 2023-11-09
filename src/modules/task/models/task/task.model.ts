import { BaseTaskModel, SuspendRequestModel, TaskAttachmentListModel } from 'modules/task/models'

import { MaybeNull } from 'shared/types/utils'

export type TaskModel = BaseTaskModel & {
  olaEstimatedTime: number
  resolution: { attachments: TaskAttachmentListModel }
  hasRelocationTasks: boolean
  attachments: MaybeNull<TaskAttachmentListModel>
  suspendRequest: MaybeNull<SuspendRequestModel>
  weight: MaybeNull<number>
  company: MaybeNull<string>
  email: MaybeNull<string>
  sapId: MaybeNull<string>
  contactType: MaybeNull<string>
}
