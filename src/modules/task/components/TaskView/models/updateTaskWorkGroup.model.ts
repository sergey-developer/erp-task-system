import { MaybeNull } from 'shared/interfaces/utils'

import { TaskDetailsModel } from './taskDetails.model'

export type UpdateTaskWorkGroupMutationArgsModel = {
  taskId: TaskDetailsModel['id']
  workGroup: MaybeNull<number>
}
