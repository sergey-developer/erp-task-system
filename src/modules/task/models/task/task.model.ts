import {
  BaseTaskModel,
  SuspendRequestModel,
  TaskAttachmentListModel,
  TaskSupportGroupModel,
} from 'modules/task/models'
import { InfrastructureModel } from 'modules/infrastructures/models'
import { WorkTypeModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TaskModel = BaseTaskModel & {
  olaEstimatedTime: number
  workType: MaybeNull<Pick<WorkTypeModel, 'id' | 'title' | 'actions'>>
  isOlaNextBreachTimeChanged: MaybeNull<boolean>
  previousOlaNextBreachTime: MaybeNull<string>
  resolution: { attachments: TaskAttachmentListModel }
  hasRelocationTasks: boolean
  previousDescription: MaybeNull<string>
  isDescriptionChanged: MaybeNull<boolean>
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
  fiscalAccumulator: MaybeNull<{
    isRequestSent: MaybeNull<boolean>
    isRequestApproved: MaybeNull<boolean>
  }>
  supportGroup: MaybeNull<TaskSupportGroupModel>
  infrastructureProject: MaybeNull<InfrastructureModel>
}
