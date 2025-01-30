import { TaskRequestArgs } from 'features/task/types'

export type DeleteTaskWorkGroupMutationArgs = TaskRequestArgs & {
  description: string
}

export type DeleteTaskWorkGroupSuccessResponse = void
