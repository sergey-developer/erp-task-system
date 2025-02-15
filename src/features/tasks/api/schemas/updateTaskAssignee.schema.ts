import { RequestWithTask } from 'features/tasks/api/types'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type UpdateTaskAssigneeRequest = RequestWithTask & {
  assignee: MaybeNull<IdType>
}

export type UpdateTaskAssigneeResponse = void
