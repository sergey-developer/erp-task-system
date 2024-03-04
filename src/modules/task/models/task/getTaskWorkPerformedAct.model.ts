import { TaskRequestArgs } from 'modules/task/types'

export type GetTaskWorkPerformedActMutationArgs = TaskRequestArgs & {
  techResolution: string
}

export type GetTaskWorkPerformedActSuccessResponse = string
