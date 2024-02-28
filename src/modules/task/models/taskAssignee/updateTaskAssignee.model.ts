import { TaskRequestArgs } from 'modules/task/types'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type UpdateTaskAssigneeMutationArgs = TaskRequestArgs & {
  assignee: MaybeNull<IdType>
}

export type UpdateTaskAssigneeSuccessResponse = void
