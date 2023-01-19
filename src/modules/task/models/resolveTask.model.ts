import { BaseTaskRequestArgs } from 'modules/task/interfaces'

export type ResolveTaskMutationArgs = BaseTaskRequestArgs &
  Partial<{
    techResolution: string
    userResolution: string
  }>

export type ResolveTaskSuccessResponse = void
