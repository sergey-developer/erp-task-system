import { RequestWithTask } from 'features/tasks/api/types'

export type DeleteTaskWorkGroupRequest = RequestWithTask & {
  description: string
}

export type DeleteTaskWorkGroupResponse = void
