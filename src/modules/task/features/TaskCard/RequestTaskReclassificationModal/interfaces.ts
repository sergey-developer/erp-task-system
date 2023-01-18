import { CreateTaskReclassificationRequestMutationArgsModel } from 'modules/task/models'
import { FieldsErrors } from 'shared/services/api'

type FormFields = Omit<
  CreateTaskReclassificationRequestMutationArgsModel,
  'taskId'
>

export type RequestTaskReclassificationFormFields = FormFields

export type RequestTaskReclassificationFormErrors = FieldsErrors<FormFields>
