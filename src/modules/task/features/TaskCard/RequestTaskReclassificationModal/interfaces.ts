import { CreateTaskReclassificationRequestMutationArgs } from 'modules/task/models'

import { FieldsErrors } from 'shared/services/api'

type FormFields = Omit<CreateTaskReclassificationRequestMutationArgs, 'taskId'>

export type RequestTaskReclassificationFormFields = FormFields

export type RequestTaskReclassificationFormErrors = FieldsErrors<FormFields>
