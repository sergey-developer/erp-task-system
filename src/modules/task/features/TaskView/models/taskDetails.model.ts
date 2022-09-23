import { TaskDetailsWorkGroupModel } from 'modules/task/features/TaskView/models/taskDetailsWorkGroup.model'
import {
  BaseTaskModel,
  TaskAssigneeModel,
  TaskAttachmentModel,
} from 'modules/task/models'
import { MaybeNull } from 'shared/interfaces/utils'

export type TaskDetailsModel = BaseTaskModel & {
  assignee: MaybeNull<TaskAssigneeModel>
  attachments: Array<TaskAttachmentModel>
  olaEstimatedTime: number
  weight?: number
  company?: string
  email?: string
  sapId?: string
  contactType?: string
  supportGroup?: {
    name: string
    code: string
    id?: number
    isBlocked?: boolean
  }
  workGroup?: MaybeNull<TaskDetailsWorkGroupModel>
}
