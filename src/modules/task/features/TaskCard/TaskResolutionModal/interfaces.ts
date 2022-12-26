import { TaskModel } from 'modules/task/models'
import { FieldsErrors } from 'shared/services/api'

export type TaskResolutionFormFields = Pick<
  TaskModel,
  'techResolution' | 'userResolution'
>

export type TaskResolutionFormErrors = FieldsErrors<TaskResolutionFormFields>
