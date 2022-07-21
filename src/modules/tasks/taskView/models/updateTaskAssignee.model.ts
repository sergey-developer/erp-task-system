import { MaybeNull } from 'shared/interfaces/utils'

import { TaskDetailsModel } from './taskDetails.model'

export type UpdateTaskAssigneeMutationArgsModel = {
  taskId: TaskDetailsModel['id']
  assignee: MaybeNull<number>
}
