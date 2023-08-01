import { BaseTaskRequestArgs } from 'modules/task/interfaces'

export type GetTaskWorkPerformedActMutationArgs = BaseTaskRequestArgs & {
  techResolution: string
}

export type GetTaskWorkPerformedActSuccessResponse = string
