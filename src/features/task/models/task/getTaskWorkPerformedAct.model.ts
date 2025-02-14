import { RequestWithTask } from 'features/task/types'

export type GetTaskWorkPerformedActRequest = RequestWithTask & {
  techResolution: string
}

export type GetTaskWorkPerformedActResponse = string
