import { RelocationTaskRequestArgs } from 'modules/warehouse/types'

import { RelocationTaskCompletionDocumentModel } from './relocationTaskCompletionDocument.model'

export type GetRelocationTaskCompletionDocumentsQueryArgs = RelocationTaskRequestArgs

export type GetRelocationTaskCompletionDocumentsSuccessResponse =
  RelocationTaskCompletionDocumentModel
