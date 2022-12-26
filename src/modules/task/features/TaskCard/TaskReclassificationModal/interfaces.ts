import { CreateTaskReclassificationRequestMutationArgsModel } from 'modules/task/models'
import { FieldsErrors } from 'shared/services/api'

type FormFields = Omit<
  CreateTaskReclassificationRequestMutationArgsModel,
  'taskId'
>

export type TaskReclassificationRequestFormFields = Required<FormFields>

export type TaskReclassificationRequestFormErrors = FieldsErrors<FormFields>
