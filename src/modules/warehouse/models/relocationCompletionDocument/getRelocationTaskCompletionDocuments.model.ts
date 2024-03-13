import { BaseRelocationTaskRequestArgs } from 'modules/warehouse/types'

import { RelocationTaskCompletionDocumentModel } from './relocationTaskCompletionDocument.model'

export type GetRelocationTaskCompletionDocumentsQueryArgs = BaseRelocationTaskRequestArgs

export type GetRelocationTaskCompletionDocumentsSuccessResponse =
  RelocationTaskCompletionDocumentModel
