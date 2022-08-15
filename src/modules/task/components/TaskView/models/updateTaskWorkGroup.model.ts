import { BaseTaskMutationArgs } from 'modules/task/interfaces/baseTaskMutation'
import { MaybeNull } from 'shared/interfaces/utils'

export type UpdateTaskWorkGroupMutationArgsModel = BaseTaskMutationArgs & {
  workGroup: MaybeNull<number>
}
