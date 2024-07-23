import { InitiationReasonModel, TaskCompletedWorkModel } from 'modules/task/models'
import { RelocationTaskCompletionDocumentModel } from 'modules/warehouse/models'

import { MaybeNull } from 'shared/types/utils'

export type TaskCompletionDocumentModel = {
  initiationReasons: MaybeNull<InitiationReasonModel[]>
  workList: MaybeNull<TaskCompletedWorkModel[]>
  relocationTasks: MaybeNull<RelocationTaskCompletionDocumentModel[]>
}
