import { RcFile } from 'antd/es/upload'

import { BaseTaskRequestArgs } from 'modules/task/interfaces'

import { ErrorResponse } from 'shared/services/api'

export type ResolveTaskMutationArgs = BaseTaskRequestArgs & {
  techResolution: string
  userResolution?: string
  attachments?: Array<RcFile>
}

export type ResolveTaskSuccessResponse = void

export type ResolveTaskBadRequestErrorResponse = ErrorResponse<
  Omit<ResolveTaskMutationArgs, 'taskId'>
>
