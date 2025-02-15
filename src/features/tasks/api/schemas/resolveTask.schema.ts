import { RequestWithTask } from 'features/tasks/api/types'

import { ErrorData } from 'shared/api/baseApi'
import { IdType } from 'shared/types/common'
import { FileToSend } from 'shared/types/file'

export type ResolveTaskRequest = RequestWithTask & {
  spentHours: number
  spentMinutes: number
  techResolution: string
  userResolution?: string
  resolutionClassifier1?: IdType
  attachments?: FileToSend[]
}

export type ResolveTaskResponse = void

export type ResolveTaskBadRequestResponse = Omit<
  ErrorData<
    Pick<
      ResolveTaskRequest,
      'spentHours' | 'spentMinutes' | 'techResolution' | 'userResolution' | 'attachments'
    >
  >,
  'errorList'
>
