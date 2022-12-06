import { BaseTaskRequestArgs } from 'modules/task/interfaces'

export type ResolveTaskMutationArgsModel = BaseTaskRequestArgs &
  Partial<{
    techResolution: string
    userResolution: string
  }>

export type ResolveTaskResponseModel = void
