import { BaseTaskRequestArgs } from 'modules/task/types'

import { TaskCompletionDocumentModel } from './taskCompletionDocument.model'

export type GetTaskCompletionDocumentsQueryArgs = BaseTaskRequestArgs
export type GetTaskCompletionDocumentsSuccessResponse = TaskCompletionDocumentModel
