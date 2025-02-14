import { TaskRequestArgs } from 'features/task/types'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type UpdateTaskAssigneeRequest = TaskRequestArgs & {
  assignee: MaybeNull<IdType>
}

export type UpdateTaskAssigneeResponse = void
