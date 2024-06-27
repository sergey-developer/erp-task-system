import { TaskRequestArgs } from 'modules/task/types'

import { ErrorResponse } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'

export type UpdateTaskWorkGroupMutationArgs = TaskRequestArgs & {
  workGroup: IdType
  workType?: IdType
  comment?: string
}

export type UpdateTaskWorkGroupSuccessResponse = void

export type UpdateTaskWorkGroupBadRequestErrorResponse = ErrorResponse<
  Pick<UpdateTaskWorkGroupMutationArgs, 'workGroup' | 'comment'>
>
