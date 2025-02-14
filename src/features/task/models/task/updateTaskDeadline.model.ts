import { RequestWithTask } from 'features/task/types'

import { MaybeNull } from 'shared/types/utils'

export type UpdateTaskDeadlineRequest = RequestWithTask & {
  internalOlaNextBreachTime: MaybeNull<string>
}

export type UpdateTaskDeadlineResponse = Pick<
  UpdateTaskDeadlineRequest,
  'internalOlaNextBreachTime'
>
