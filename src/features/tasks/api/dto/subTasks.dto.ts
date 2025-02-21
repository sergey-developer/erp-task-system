import { TaskStatusEnum } from 'features/tasks/api/constants'

import { SupportGroupDTO } from 'shared/supportGroups/api/dto'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type SubTaskDTO = {
  id: IdType
  title: string
  status: TaskStatusEnum
  externalAssigneePhone: string
  createdAt: string
  supportGroup: MaybeNull<SupportGroupDTO>
  cancelReason: MaybeNull<string>
  returnReason: MaybeNull<string>
  recordId: MaybeNull<string>
  techResolution: MaybeNull<string>
  description: MaybeNull<string>
  olaNextBreachTime: MaybeNull<string>
  externalAssigneeName: MaybeNull<string>
}
