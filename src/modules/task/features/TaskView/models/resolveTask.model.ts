import { BaseTaskRequestArgs } from 'modules/task/interfaces/baseTaskRequest'

export type ResolveTaskMutationArgsModel = BaseTaskRequestArgs &
  Partial<{
    techResolution: string
    userResolution: string
  }>
