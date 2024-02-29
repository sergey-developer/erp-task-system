import { TaskRequestArgs } from 'modules/task/types'

import { MaybeNull } from 'shared/types/utils'

export type UpdateTaskDeadlineMutationArgs = TaskRequestArgs & {
  internalOlaNextBreachTime: MaybeNull<string>
}

export type UpdateTaskDeadlineSuccessResponse = Pick<
  UpdateTaskDeadlineMutationArgs,
  'internalOlaNextBreachTime'
>
