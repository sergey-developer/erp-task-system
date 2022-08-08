import { BaseTaskModel } from 'modules/task/models/baseTask.model'
import { WorkGroupListItemModel } from 'modules/workGroup/components/WorkGroupList/models'
import { AssigneeModel } from 'shared/interfaces/models'
import { MaybeNull } from 'shared/interfaces/utils'

import { TaskListCommentModel } from './taskListComment.model'
import { TaskReclassificationRequestModel } from './taskReclassificationRequest.model'

export type TaskListItemModel = BaseTaskModel & {
  assignee: Pick<AssigneeModel, 'id' | 'firstName' | 'lastName' | 'middleName'>
  comment: TaskListCommentModel
  reclassificationRequest: TaskReclassificationRequestModel
  workGroup: WorkGroupListItemModel
  initialImpact?: MaybeNull<number>
}
