import { BaseTaskRequestArgs } from 'modules/task/types'

export type GetTaskWorkPerformedActMutationArgs = BaseTaskRequestArgs & {
  techResolution: string
}

export type GetTaskWorkPerformedActSuccessResponse = string
