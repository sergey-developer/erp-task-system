import { BaseTaskRequestArgs } from 'modules/task/interfaces'
import { ErrorResponse } from 'shared/services/api'

export type UpdateTaskWorkGroupMutationArgs = BaseTaskRequestArgs & {
  workGroup: number
}

export type UpdateTaskWorkGroupSuccessResponse = void

export type UpdateTaskWorkGroupBadRequestErrorResponse = ErrorResponse<
  Omit<UpdateTaskWorkGroupMutationArgs, 'taskId'>
>
