import { BaseTaskMutationArgs } from 'modules/task/interfaces/baseTaskMutation'

export type ResolveTaskMutationArgsModel = BaseTaskMutationArgs &
  Partial<{
    techResolution: string
    userResolution: string
  }>
