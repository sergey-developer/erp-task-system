import { RequestWithRelocationTask } from 'features/warehouse/types'

import { RelocationTaskCompletionDocumentModel } from './relocationTaskCompletionDocument.model'

export type GetRelocationTaskCompletionDocumentsRequest = RequestWithRelocationTask

export type GetRelocationTaskCompletionDocumentsResponse = RelocationTaskCompletionDocumentModel
