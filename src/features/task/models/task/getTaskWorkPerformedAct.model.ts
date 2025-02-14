import { TaskRequestArgs } from 'features/task/types'

export type GetTaskWorkPerformedActRequest = TaskRequestArgs & {
  techResolution: string
}

export type GetTaskWorkPerformedActResponse = string
