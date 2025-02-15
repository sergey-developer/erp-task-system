import { RelocationTaskCompletionDocumentDTO } from 'features/relocationTasks/api/dto'
import { TaskCompletedWorkDTO, TaskInitiationReasonDTO } from 'features/tasks/api/dto/index'

import { MaybeNull } from 'shared/types/utils'

export type TaskCompletionDocumentDTO = {
  initiationReasons: MaybeNull<TaskInitiationReasonDTO[]>
  workList: MaybeNull<TaskCompletedWorkDTO[]>
  relocationTasks: MaybeNull<RelocationTaskCompletionDocumentDTO[]>
}
