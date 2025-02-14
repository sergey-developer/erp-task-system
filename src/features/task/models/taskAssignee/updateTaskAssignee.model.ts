import { RequestWithTask } from 'features/task/types'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type UpdateTaskAssigneeRequest = RequestWithTask & {
  assignee: MaybeNull<IdType>
}

export type UpdateTaskAssigneeResponse = void
