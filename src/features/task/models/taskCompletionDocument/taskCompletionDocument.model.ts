import { InitiationReasonModel, TaskCompletedWorkModel } from 'features/task/models'
import { RelocationTaskCompletionDocumentDTO } from 'features/warehouse/models'

import { MaybeNull } from 'shared/types/utils'

export type TaskCompletionDocumentModel = {
  initiationReasons: MaybeNull<InitiationReasonModel[]>
  workList: MaybeNull<TaskCompletedWorkModel[]>
  relocationTasks: MaybeNull<RelocationTaskCompletionDocumentDTO[]>
}
