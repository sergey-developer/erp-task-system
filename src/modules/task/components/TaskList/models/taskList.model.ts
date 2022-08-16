import {
  BaseTaskModel,
  TaskReclassificationRequestModel,
} from 'modules/task/models'
import { WorkGroupListItemModel } from 'modules/workGroup/components/WorkGroupList/models'
import { AssigneeModel } from 'shared/interfaces/models'

import { TaskListCommentModel } from './taskListComment.model'

export type TaskListItemModel = BaseTaskModel & {
  assignee: Pick<AssigneeModel, 'id' | 'firstName' | 'lastName' | 'middleName'>
  comment: TaskListCommentModel
  reclassificationRequest: TaskReclassificationRequestModel
  workGroup: WorkGroupListItemModel
}
