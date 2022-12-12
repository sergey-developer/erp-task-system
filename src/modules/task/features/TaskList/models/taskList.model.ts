import { BaseTaskModel, TaskAssigneeModel } from 'modules/task/models'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'
import { MaybeNull } from 'shared/interfaces/utils'

export type TaskListItemModel = BaseTaskModel & {
  assignee: TaskAssigneeModel
  lastComment: string
  workGroup: MaybeNull<Pick<WorkGroupListItemModel, 'id' | 'name'>>
}
