import { TaskDetailsWorkGroupModel } from 'modules/task/features/TaskView/models/taskDetailsWorkGroup.model'
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
}
