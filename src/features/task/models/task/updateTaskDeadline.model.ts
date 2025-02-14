import { TaskRequestArgs } from 'features/task/types'

import { MaybeNull } from 'shared/types/utils'

export type UpdateTaskDeadlineRequest = TaskRequestArgs & {
  internalOlaNextBreachTime: MaybeNull<string>
}

export type UpdateTaskDeadlineResponse = Pick<
  UpdateTaskDeadlineRequest,
  'internalOlaNextBreachTime'
>
