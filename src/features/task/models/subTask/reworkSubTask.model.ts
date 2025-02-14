import { SubTaskRequestArgs, TaskRequestArgs } from 'features/task/types'

export type ReworkSubTaskRequest = TaskRequestArgs &
  SubTaskRequestArgs & {
    returnReason: string
  }

export type ReworkSubTaskResponse = void
