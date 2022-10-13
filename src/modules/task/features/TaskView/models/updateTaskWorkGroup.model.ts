import { BaseTaskRequestArgs } from 'modules/task/interfaces'
import { MaybeNull } from 'shared/interfaces/utils'

export type UpdateTaskWorkGroupMutationArgsModel = BaseTaskRequestArgs & {
  workGroup: MaybeNull<number>
}
