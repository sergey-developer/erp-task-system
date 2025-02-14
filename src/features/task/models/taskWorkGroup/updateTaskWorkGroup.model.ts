import { TaskRequestArgs } from 'features/task/types'

import { ErrorResponse } from 'shared/api/baseApi'
import { IdType } from 'shared/types/common'

export type UpdateTaskWorkGroupRequest = TaskRequestArgs & {
  workGroup: IdType
  workType?: IdType
  comment?: string
}

export type UpdateTaskWorkGroupResponse = void

export type UpdateTaskWorkGroupBadRequestErrorResponse = ErrorResponse<
  Pick<UpdateTaskWorkGroupRequest, 'workGroup' | 'comment'>
>
