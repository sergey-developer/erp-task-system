import { RequestWithTask } from 'features/task/types'

export type DeleteTaskWorkGroupRequest = RequestWithTask & {
  description: string
}

export type DeleteTaskWorkGroupResponse = void
