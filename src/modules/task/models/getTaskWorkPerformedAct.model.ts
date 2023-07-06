import { BaseTaskRequestArgs } from 'modules/task/interfaces'

export type GetTaskWorkPerformedActQueryArgs = BaseTaskRequestArgs & {
  completedAt: string
  techResolution: string
}

export type GetTaskWorkPerformedActSuccessResponse = string
