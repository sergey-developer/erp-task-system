import { TaskDetailsModel } from 'modules/task/models'
import { FieldsErrors } from 'shared/services/api'

export type TaskResolutionFormFields = Pick<
  TaskDetailsModel,
  'techResolution' | 'userResolution'
>

export type TaskResolutionFormErrors = FieldsErrors<TaskResolutionFormFields>
