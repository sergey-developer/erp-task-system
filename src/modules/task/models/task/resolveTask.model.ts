import { BaseTaskRequestArgs } from 'modules/task/types'

import { ErrorData } from 'shared/services/baseApi'
import { FileToSend } from 'shared/types/file'

export type ResolveTaskMutationArgs = BaseTaskRequestArgs & {
  techResolution: string
  userResolution?: string
  attachments?: FileToSend[]
}

export type ResolveTaskSuccessResponse = void

export type ResolveTaskBadRequestErrorResponse = Omit<
  ErrorData<Pick<ResolveTaskMutationArgs, 'techResolution' | 'userResolution' | 'attachments'>>,
  'errorList'
>
