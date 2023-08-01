import { BaseTaskRequestArgs } from 'modules/task/types'

import { MaybeNull } from 'shared/types/utils'

export type UpdateTaskAssigneeMutationArgs = BaseTaskRequestArgs & {
  assignee: MaybeNull<number>
}

export type UpdateTaskAssigneeSuccessResponse = void
