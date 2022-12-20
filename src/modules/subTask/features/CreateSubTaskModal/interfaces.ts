import { FormInstance, ModalProps } from 'antd'

import {
  CreateSubTaskMutationArgsModel,
  SubTaskTemplateModel,
} from 'modules/subTask/models'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { FieldsErrors } from 'shared/services/api'

type FormFields = Omit<CreateSubTaskMutationArgsModel, 'taskId'>

export type CreateSubTaskFormFields = Required<FormFields>

export type CreateSubTaskFormErrors = FieldsErrors<FormFields>

export type CreateSubTaskModalProps = Pick<TaskDetailsModel, 'recordId'> & {
  initialFormValues: Partial<
    Pick<CreateSubTaskFormFields, 'title' | 'description'>
  >

  templateOptions: Array<SubTaskTemplateModel>
  templateOptionsIsLoading: boolean

  isLoading: boolean

  onCancel: NonNullable<ModalProps['onCancel']>
  onSubmit: (
    values: CreateSubTaskFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
}
