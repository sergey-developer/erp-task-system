import { BaseRelocationTaskRequestArgs } from 'modules/warehouse/types'

import { FieldsErrors } from 'shared/services/baseApi'
import { FileToUpload } from 'shared/types/file'

export type ExecuteRelocationTaskMutationArgs = BaseRelocationTaskRequestArgs & {
  documents: FileToUpload[]
}

export type ExecuteRelocationTaskSuccessResponse = void

export type ExecuteRelocationTaskBadRequestErrorResponse = FieldsErrors<
  Partial<Pick<ExecuteRelocationTaskMutationArgs, 'documents'>>
>
