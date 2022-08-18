import { BaseTaskRequestArgs } from 'modules/task/interfaces/baseTaskRequest'
import { MaybeNull } from 'shared/interfaces/utils'

export type UpdateTaskWorkGroupMutationArgsModel = BaseTaskRequestArgs & {
  workGroup: MaybeNull<number>
}
