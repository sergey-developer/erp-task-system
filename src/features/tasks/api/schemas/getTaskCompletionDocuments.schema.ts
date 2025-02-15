import { RequestWithTask } from 'features/tasks/api/types'

import { TaskCompletionDocumentDTO } from '../dto'

export type GetTaskCompletionDocumentsRequest = RequestWithTask
export type GetTaskCompletionDocumentsResponse = TaskCompletionDocumentDTO
