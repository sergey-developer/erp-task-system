import { TaskStatusEnum } from 'modules/task/constants/common'
import { TaskDetailsWorkGroupModel } from 'modules/task/models'
import { MaybeNull } from 'shared/interfaces/utils'

export type SubTaskModel = {
  id: number
  title: string
  status: TaskStatusEnum
  workGroup: MaybeNull<TaskDetailsWorkGroupModel>
  createdAt: string
  recordId?: MaybeNull<string>
  techResolution?: string
  description?: string
  olaNextBreachTime?: MaybeNull<string>
  externalAssigneeName?: string
  externalAssigneePhone?: string
}
