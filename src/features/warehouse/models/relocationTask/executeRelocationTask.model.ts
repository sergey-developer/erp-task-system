import { RelocationTaskRequestArgs } from 'features/warehouse/types'

import { FieldsErrors } from 'shared/api/baseApi'
import { FileToSend } from 'shared/types/file'

export type ExecuteRelocationTaskMutationArgs = RelocationTaskRequestArgs & {
  documents: FileToSend[]
}

export type ExecuteRelocationTaskSuccessResponse = void

export type ExecuteRelocationTaskBadRequestErrorResponse = FieldsErrors<
  Partial<Pick<ExecuteRelocationTaskMutationArgs, 'documents'>>
>
