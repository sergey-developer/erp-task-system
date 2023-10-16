import { BaseSubTaskRequestArgs, BaseTaskRequestArgs } from 'modules/task/types'

export type ReworkSubTaskMutationArgs = BaseTaskRequestArgs &
  BaseSubTaskRequestArgs & {
    returnReason: string
  }

export type ReworkSubTaskSuccessResponse = void
