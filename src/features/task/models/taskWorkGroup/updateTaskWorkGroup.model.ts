import { TaskRequestArgs } from 'features/task/types'

import { ErrorResponse } from 'shared/api/services/baseApi'
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
