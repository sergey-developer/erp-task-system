import { RcFile } from 'antd/es/upload'

import { BaseTaskRequestArgs } from 'modules/task/types'

import { ErrorResponse } from 'shared/services/baseApi'

export type ResolveTaskMutationArgs = BaseTaskRequestArgs & {
  techResolution: string
  userResolution?: string
  attachments?: RcFile[]
}

export type ResolveTaskSuccessResponse = void

export type ResolveTaskBadRequestErrorResponse = ErrorResponse<
  Pick<ResolveTaskMutationArgs, 'techResolution' | 'userResolution' | 'attachments'>
>
