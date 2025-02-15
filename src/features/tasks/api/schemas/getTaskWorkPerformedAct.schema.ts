import { RequestWithTask } from 'features/tasks/api/types'

export type GetTaskWorkPerformedActRequest = RequestWithTask & {
  techResolution: string
}

export type GetTaskWorkPerformedActResponse = string
