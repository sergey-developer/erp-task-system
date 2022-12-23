import {
  BaseTaskModel,
  TaskAssigneeModel,
  TaskDetailsWorkGroupModel,
} from 'modules/task/models'
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
