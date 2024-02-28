import { BaseTaskModel, SuspendRequestModel, TaskAttachmentListModel } from 'modules/task/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TaskModel = BaseTaskModel & {
  olaEstimatedTime: number
  resolution: { attachments: TaskAttachmentListModel }
  hasRelocationTasks: boolean
  previousDescription: MaybeNull<string>
  attachments: MaybeNull<TaskAttachmentListModel>
  suspendRequest: MaybeNull<SuspendRequestModel>
  weight: MaybeNull<number>
  company: MaybeNull<string>
  email: MaybeNull<string>
  sapId: MaybeNull<string>
  contactType: MaybeNull<string>
  shop: MaybeNull<{
    id: IdType
    title: string
  }>
}
