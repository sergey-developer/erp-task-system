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
  workGroup?: MaybeNull<TaskDetailsWorkGroupModel>
}
