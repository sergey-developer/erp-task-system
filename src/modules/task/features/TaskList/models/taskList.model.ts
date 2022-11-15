import { BaseTaskModel, TaskAssigneeModel } from 'modules/task/models'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'
import { MaybeNull } from 'shared/interfaces/utils'

export type TaskListItemModel = BaseTaskModel & {
  assignee: Pick<
    TaskAssigneeModel,
    'id' | 'firstName' | 'lastName' | 'middleName'
  >
  lastComment: string
  workGroup: MaybeNull<Pick<WorkGroupListItemModel, 'id' | 'name'>>
}
