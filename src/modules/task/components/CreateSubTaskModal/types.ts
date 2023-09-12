import { CreateSubTaskMutationArgs } from 'modules/task/models'
import { TaskModel } from 'modules/task/models'

import { FieldsErrors } from 'shared/services/baseApi'

type FormFields = Omit<CreateSubTaskMutationArgs, 'taskId'>

export type CreateSubTaskFormFields = Required<FormFields>

export type CreateSubTaskFormErrors = FieldsErrors<FormFields>

export type CreateSubTaskModalProps = {
  task: Pick<TaskModel, 'id' | 'title' | 'description' | 'type' | 'recordId'>
  onCancel: () => void
}
