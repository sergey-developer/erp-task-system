import { TaskStatusEnum } from 'modules/task/constants/common'
import { MaybeNull } from 'shared/interfaces/utils'
import { SupportGroupModel } from 'shared/models'

export type SubTaskModel = {
  id: number
  title: string
  status: TaskStatusEnum
  supportGroup: SupportGroupModel
  createdAt: string
  cancelReason: MaybeNull<string>
  returnReason: MaybeNull<string>
  recordId?: MaybeNull<string>
  techResolution?: string
  description?: string
  olaNextBreachTime?: MaybeNull<string>
  externalAssigneeName?: string
  externalAssigneePhone?: string
}
