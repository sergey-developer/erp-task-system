import { BaseTaskRequestArgs } from 'modules/task/interfaces'

export type DeleteTaskWorkGroupMutationArgs = BaseTaskRequestArgs & {
  description: string
}

export type DeleteTaskWorkGroupSuccessResponse = void
