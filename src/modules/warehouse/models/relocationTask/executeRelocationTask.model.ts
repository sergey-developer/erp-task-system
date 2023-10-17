import { BaseRelocationTaskRequestArgs } from 'modules/warehouse/types'

import { FileToSend } from 'shared/types/file'

export type ExecuteRelocationTaskMutationArgs = BaseRelocationTaskRequestArgs & {
  documents: FileToSend[]
}

export type ExecuteRelocationTaskSuccessResponse = void
