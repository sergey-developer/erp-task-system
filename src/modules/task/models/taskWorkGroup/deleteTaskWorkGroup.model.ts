import { TaskRequestArgs } from 'modules/task/types'

export type DeleteTaskWorkGroupMutationArgs = TaskRequestArgs & {
  description: string
}

export type DeleteTaskWorkGroupSuccessResponse = void
