import { TaskDetailDTO } from 'features/tasks/api/dto'
import { CreateSubTaskRequest } from 'features/tasks/api/schemas'

import { FieldsErrors } from 'shared/api/baseApi'
import { EmptyFn } from 'shared/types/utils'

type FormFields = Omit<CreateSubTaskRequest, 'taskId'>

export type CreateSubTaskFormFields = Required<FormFields>

export type CreateSubTaskFormErrors = FieldsErrors<FormFields>

export type CreateSubTaskModalProps = {
  task: Pick<TaskDetailDTO, 'id' | 'title' | 'description' | 'type' | 'recordId'>
  onCancel: EmptyFn
}
