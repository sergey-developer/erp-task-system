import { TaskStatusEnum } from 'modules/task/constants/common'
import { TaskDetailsWorkGroupModel } from 'modules/task/features/TaskView/models'
import { BaseTaskModel, TaskAssigneeModel } from 'modules/task/models'
import { MaybeNull } from 'shared/interfaces/utils'

export type TaskDetailsModel = BaseTaskModel & {
  assignee: MaybeNull<TaskAssigneeModel>
  olaEstimatedTime: number
  weight?: number
  company?: string
  email?: string
  sapId?: string
  contactType?: string
  supportGroup?: {
    id: number
    name: string
  }
  workGroup?: MaybeNull<TaskDetailsWorkGroupModel>
  // todo: поправить тип когда он будет известен
  parentTask: MaybeNull<{
    status: TaskStatusEnum
    assignee: number
  }>
}
