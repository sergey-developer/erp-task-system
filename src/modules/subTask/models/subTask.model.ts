import { SupportGroupModel } from 'modules/supportGroup/models'
import { TaskStatusEnum } from 'modules/task/constants'

import { MaybeNull } from 'shared/types/utils'

export type SubTaskModel = {
  id: number
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
