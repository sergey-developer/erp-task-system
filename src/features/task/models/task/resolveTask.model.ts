import { TaskRequestArgs } from 'features/task/types'

import { ErrorData } from 'shared/api/services/baseApi'
import { IdType } from 'shared/types/common'
import { FileToSend } from 'shared/types/file'

export type ResolveTaskMutationArgs = TaskRequestArgs & {
  spentHours: number
  spentMinutes: number
  techResolution: string
  userResolution?: string
  resolutionClassifier1?: IdType
  attachments?: FileToSend[]
}

export type ResolveTaskSuccessResponse = void

export type ResolveTaskBadRequestErrorResponse = Omit<
  ErrorData<
    Pick<
      ResolveTaskMutationArgs,
      'spentHours' | 'spentMinutes' | 'techResolution' | 'userResolution' | 'attachments'
    >
  >,
  'errorList'
>
