import { BaseTaskRequestArgs } from 'modules/task/types'

import { ErrorResponse } from 'shared/services/baseApi'
import { FileToUpload } from 'shared/types/file'

export type ResolveTaskMutationArgs = BaseTaskRequestArgs & {
  techResolution: string
  userResolution?: string
  attachments?: FileToUpload[]
}

export type ResolveTaskSuccessResponse = void

export type ResolveTaskBadRequestErrorResponse = ErrorResponse<
  Pick<ResolveTaskMutationArgs, 'techResolution' | 'userResolution' | 'attachments'>
>
