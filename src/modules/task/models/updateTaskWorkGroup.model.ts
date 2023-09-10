import { BaseTaskRequestArgs } from 'modules/task/types'

import { ErrorResponse } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'

export type UpdateTaskWorkGroupMutationArgs = BaseTaskRequestArgs & {
  workGroup: IdType
  comment?: string
}

export type UpdateTaskWorkGroupSuccessResponse = void

export type UpdateTaskWorkGroupBadRequestErrorResponse = ErrorResponse<
  Omit<UpdateTaskWorkGroupMutationArgs, 'taskId'>
>
