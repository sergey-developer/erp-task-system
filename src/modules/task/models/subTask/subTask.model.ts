import { SupportGroupModel } from 'modules/supportGroup/models'
import { TaskStatusEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type SubTaskModel = {
  id: IdType
  title: string
  status: TaskStatusEnum
  supportGroup: MaybeNull<SupportGroupModel>
  createdAt: string
  cancelReason: MaybeNull<string>
  returnReason: MaybeNull<string>
  recordId: MaybeNull<string>
  techResolution: MaybeNull<string>
  description: MaybeNull<string>
  olaNextBreachTime: MaybeNull<string>
  externalAssigneeName: MaybeNull<string>
  externalAssigneePhone: MaybeNull<string>
}
