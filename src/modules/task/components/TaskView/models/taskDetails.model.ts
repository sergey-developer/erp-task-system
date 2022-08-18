import { TaskDetailsWorkGroupModel } from 'modules/task/components/TaskView/models/taskDetailsWorkGroup.model'
import { BaseTaskModel, TaskAttachmentModel } from 'modules/task/models'
import { AssigneeModel } from 'shared/interfaces/models'
import { MaybeNull } from 'shared/interfaces/utils'

export type TaskDetailsModel = BaseTaskModel & {
  assignee: MaybeNull<AssigneeModel>
  attachments: Array<TaskAttachmentModel>
  olaEstimatedTime: number
  workGroup?: MaybeNull<TaskDetailsWorkGroupModel>
}
