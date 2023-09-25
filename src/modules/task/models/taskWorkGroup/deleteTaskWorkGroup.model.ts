import { BaseTaskRequestArgs } from 'modules/task/types'

export type DeleteTaskWorkGroupMutationArgs = BaseTaskRequestArgs & {
  description: string
}

export type DeleteTaskWorkGroupSuccessResponse = void
