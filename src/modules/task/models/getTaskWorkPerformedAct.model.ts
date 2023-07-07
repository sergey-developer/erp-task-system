import { BaseTaskRequestArgs } from 'modules/task/interfaces'

export type GetTaskWorkPerformedActQueryArgs = BaseTaskRequestArgs & {
  techResolution: string
}

export type GetTaskWorkPerformedActSuccessResponse = string
