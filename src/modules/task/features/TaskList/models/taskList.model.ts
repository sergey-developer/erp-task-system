import { BaseTaskModel } from 'modules/task/models'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'
import { AssigneeModel } from 'shared/interfaces/models'

import { TaskListCommentModel } from './taskListComment.model'
import { TaskListReclassificationRequestModel } from './taskListReclassificationRequest.model'

export type TaskListItemModel = BaseTaskModel & {
  assignee: Pick<AssigneeModel, 'id' | 'firstName' | 'lastName' | 'middleName'>
  comment: TaskListCommentModel
  reclassificationRequest: TaskListReclassificationRequestModel
  workGroup: WorkGroupListItemModel
}
