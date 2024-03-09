import { CompletedWorkModel, InitiationReasonModel } from 'modules/task/models'
import { RelocationCompletionDocumentModel } from 'modules/warehouse/models'

import { MaybeNull } from 'shared/types/utils'

export type TaskCompletionDocumentModel = {
  initiationReasons: MaybeNull<InitiationReasonModel[]>
  workList: MaybeNull<CompletedWorkModel[]>
  relocationTasks: MaybeNull<RelocationCompletionDocumentModel[]>
}
