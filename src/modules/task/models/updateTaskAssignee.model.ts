import { BaseTaskRequestArgs } from 'modules/task/interfaces'
import { MaybeNull } from 'shared/interfaces/utils'

export type UpdateTaskAssigneeMutationArgs = BaseTaskRequestArgs & {
  assignee: MaybeNull<number>
}

export type UpdateTaskAssigneeSuccessResponse = void
