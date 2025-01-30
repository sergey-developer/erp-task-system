import { SubTaskRequestArgs, TaskRequestArgs } from 'features/task/types'

export type ReworkSubTaskMutationArgs = TaskRequestArgs &
  SubTaskRequestArgs & {
    returnReason: string
  }

export type ReworkSubTaskSuccessResponse = void
