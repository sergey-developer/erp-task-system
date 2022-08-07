import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import { FieldsErrors } from 'shared/services/api'

type FormFields = Pick<TaskDetailsModel, 'techResolution' | 'userResolution'>

export type TaskResolutionFormFields = Required<FormFields>

export type TaskResolutionFormErrors = FieldsErrors<FormFields>
