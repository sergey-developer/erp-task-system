import { CreateSubTaskRequest, TaskModel } from 'features/task/models'

import { FieldsErrors } from 'shared/api/baseApi'
import { EmptyFn } from 'shared/types/utils'

type FormFields = Omit<CreateSubTaskRequest, 'taskId'>

export type CreateSubTaskFormFields = Required<FormFields>

export type CreateSubTaskFormErrors = FieldsErrors<FormFields>

export type CreateSubTaskModalProps = {
  task: Pick<TaskModel, 'id' | 'title' | 'description' | 'type' | 'recordId'>
  onCancel: EmptyFn
}
