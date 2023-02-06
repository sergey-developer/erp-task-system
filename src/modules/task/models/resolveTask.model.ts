import { BaseTaskRequestArgs } from 'modules/task/interfaces'
import { ErrorResponse } from 'shared/services/api'

export type ResolveTaskMutationArgs = BaseTaskRequestArgs &
  Partial<{
    techResolution: string
    userResolution: string
  }>

export type ResolveTaskSuccessResponse = void

export type ResolveTaskBadRequestErrorResponse = ErrorResponse<
  Omit<ResolveTaskMutationArgs, 'taskId'>
>
