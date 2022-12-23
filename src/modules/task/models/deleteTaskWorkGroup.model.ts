import { BaseTaskRequestArgs } from 'modules/task/interfaces'

export type DeleteTaskWorkGroupMutationArgsModel = BaseTaskRequestArgs & {
  description: string
}

export type DeleteTaskWorkGroupResponseModel = void
