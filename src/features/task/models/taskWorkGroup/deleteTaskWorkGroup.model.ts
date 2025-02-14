import { TaskRequestArgs } from 'features/task/types'

export type DeleteTaskWorkGroupRequest = TaskRequestArgs & {
  description: string
}

export type DeleteTaskWorkGroupResponse = void
