import { FormInstance, ModalProps } from 'antd'

import {
  CreateSubTaskMutationArgs,
  SubTaskTemplateModel,
} from 'modules/subTask/models'
import { TaskModel } from 'modules/task/models'

import { FieldsErrors } from 'shared/services/api'

type FormFields = Omit<CreateSubTaskMutationArgs, 'taskId'>

export type CreateSubTaskFormFields = Required<FormFields>

export type CreateSubTaskFormErrors = FieldsErrors<FormFields>

export type CreateSubTaskModalProps = Pick<TaskModel, 'recordId'> & {
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
