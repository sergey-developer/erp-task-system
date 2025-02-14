import { RequestWithTask } from 'features/task/types'

import { TaskCompletionDocumentModel } from './taskCompletionDocument.model'

export type GetTaskCompletionDocumentsRequest = RequestWithTask
export type GetTaskCompletionDocumentsResponse = TaskCompletionDocumentModel
