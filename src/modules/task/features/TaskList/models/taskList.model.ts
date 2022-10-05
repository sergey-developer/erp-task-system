import { BaseTaskModel, TaskAssigneeModel } from 'modules/task/models'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'
import { MaybeNull } from 'shared/interfaces/utils'

import { TaskListCommentModel } from './taskListComment.model'
import { TaskListReclassificationRequestModel } from './taskListReclassificationRequest.model'

export type TaskListItemModel = BaseTaskModel & {
  assignee: Pick<
    TaskAssigneeModel,
    'id' | 'firstName' | 'lastName' | 'middleName'
  >
  comment: MaybeNull<TaskListCommentModel>
  reclassificationRequest: TaskListReclassificationRequestModel
  workGroup: MaybeNull<WorkGroupListItemModel>
}
