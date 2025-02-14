import { RequestWithRelocationTask } from 'features/warehouse/types'

import { FieldsErrors } from 'shared/api/baseApi'
import { FileToSend } from 'shared/types/file'

export type ExecuteRelocationTaskRequest = RequestWithRelocationTask & {
  documents: FileToSend[]
}

export type ExecuteRelocationTaskResponse = void

export type ExecuteRelocationTaskBadRequestResponse = FieldsErrors<
  Partial<Pick<ExecuteRelocationTaskRequest, 'documents'>>
>
