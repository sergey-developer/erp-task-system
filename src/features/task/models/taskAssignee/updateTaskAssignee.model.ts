import { TaskRequestArgs } from 'features/task/types'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type UpdateTaskAssigneeMutationArgs = TaskRequestArgs & {
  assignee: MaybeNull<IdType>
}

export type UpdateTaskAssigneeSuccessResponse = void
