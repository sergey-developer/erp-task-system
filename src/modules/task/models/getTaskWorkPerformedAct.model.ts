import { TaskModel } from './task.model'

export type GetTaskWorkPerformedActQueryArgs = {
  task: TaskModel['id']
  completedAt: string
  techResolution: string
}

export type GetTaskWorkPerformedActSuccessResponse = {
  file: string
}
