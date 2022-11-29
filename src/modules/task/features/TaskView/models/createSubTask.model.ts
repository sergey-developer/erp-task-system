import { SubTaskModel } from 'modules/task/features/TaskView/models'
import { BaseTaskRequestArgs } from 'modules/task/interfaces'

export type CreateSubTaskMutationArgsModel = BaseTaskRequestArgs & {
  title: string
  description: string
  template: string
}

export type CreateSubTaskResponseModel = SubTaskModel
