import { TaskRequestArgs } from 'features/task/types'

export type GetTaskWorkPerformedActMutationArgs = TaskRequestArgs & {
  techResolution: string
}

export type GetTaskWorkPerformedActSuccessResponse = string
