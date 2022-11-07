import { BaseTaskRequestArgs } from 'modules/task/interfaces'
import { MaybeNull } from 'shared/interfaces/utils'

export type UpdateTaskAssigneeMutationArgsModel = BaseTaskRequestArgs & {
  assignee: MaybeNull<number>
}

export type UpdateTaskAssigneeResponseModel = void
