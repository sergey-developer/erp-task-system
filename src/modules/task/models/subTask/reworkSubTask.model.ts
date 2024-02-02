import { SubTaskRequestArgs, TaskRequestArgs } from 'modules/task/types'

export type ReworkSubTaskMutationArgs = TaskRequestArgs &
  SubTaskRequestArgs & {
    returnReason: string
  }

export type ReworkSubTaskSuccessResponse = void
