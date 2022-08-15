import { BaseTaskMutationArgs } from 'modules/task/interfaces/baseTaskMutation'
import { MaybeNull } from 'shared/interfaces/utils'

export type UpdateTaskAssigneeMutationArgsModel = BaseTaskMutationArgs & {
  assignee: MaybeNull<number>
}
