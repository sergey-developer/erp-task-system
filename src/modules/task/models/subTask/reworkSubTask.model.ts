import { BaseSubTaskRequestArgs, TaskRequestArgs } from 'modules/task/types'

export type ReworkSubTaskMutationArgs = TaskRequestArgs &
  BaseSubTaskRequestArgs & {
    returnReason: string
  }

export type ReworkSubTaskSuccessResponse = void
