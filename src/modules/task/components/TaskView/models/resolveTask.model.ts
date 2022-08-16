import { BaseTaskRequestArgs } from 'modules/task/interfaces/baseTaskMutation'

export type ResolveTaskMutationArgsModel = BaseTaskRequestArgs &
  Partial<{
    techResolution: string
    userResolution: string
  }>
