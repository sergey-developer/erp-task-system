import { TaskDetailsModel } from './taskDetails.model'

export type ResolveTaskMutationArgsModel = {
  taskId: TaskDetailsModel['id']
  techResolution?: string
  userResolution?: string
}
