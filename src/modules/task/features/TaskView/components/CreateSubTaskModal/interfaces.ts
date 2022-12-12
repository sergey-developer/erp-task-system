import { FormInstance, ModalProps } from 'antd'

import { FieldsErrors } from 'shared/services/api'

import {
  CreateSubTaskMutationArgsModel,
  SubTaskTemplateModel,
  TaskDetailsModel,
} from '../../models'

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
