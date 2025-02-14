import { RelocationTaskRequestArgs } from 'features/warehouse/types'

import { FieldsErrors } from 'shared/api/baseApi'
import { FileToSend } from 'shared/types/file'

export type ExecuteRelocationTaskRequest = RelocationTaskRequestArgs & {
  documents: FileToSend[]
}

export type ExecuteRelocationTaskResponse = void

export type ExecuteRelocationTaskBadRequestErrorResponse = FieldsErrors<
  Partial<Pick<ExecuteRelocationTaskRequest, 'documents'>>
>
