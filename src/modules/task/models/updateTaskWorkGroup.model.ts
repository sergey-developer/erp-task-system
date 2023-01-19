import { BaseTaskRequestArgs } from 'modules/task/interfaces'
import { MaybeNull } from 'shared/interfaces/utils'

export type UpdateTaskWorkGroupMutationArgs = BaseTaskRequestArgs & {
  workGroup: MaybeNull<number>
}

export type UpdateTaskWorkGroupSuccessResponse = void
