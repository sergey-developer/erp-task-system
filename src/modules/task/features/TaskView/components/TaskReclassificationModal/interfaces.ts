import { CreateTaskReclassificationRequestMutationArgsModel } from 'modules/task/features/TaskView/models'
import { FieldsErrors } from 'shared/services/api'

type FormFields = Omit<
  CreateTaskReclassificationRequestMutationArgsModel,
  'taskId'
>

export type TaskReclassificationRequestFormFields = Required<FormFields>

export type TaskReclassificationRequestFormErrors = FieldsErrors<FormFields>
