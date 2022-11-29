import { FormInstance, ModalProps } from 'antd'

import {
  CreateSubTaskMutationArgsModel,
  SubTaskTemplateModel,
  TaskDetailsModel,
} from 'modules/task/features/TaskView/models'
import { FieldsErrors } from 'shared/services/api'

type FormFields = Omit<CreateSubTaskMutationArgsModel, 'taskId'>

export type SubTaskFormFields = Required<FormFields>

export type SubTaskFormErrors = FieldsErrors<FormFields>

export type CreateSubTaskModalProps = Pick<TaskDetailsModel, 'recordId'> & {
  initialFormValues: Partial<Pick<SubTaskFormFields, 'title' | 'description'>>
  templateOptions: Array<SubTaskTemplateModel>
  templateOptionsIsLoading: boolean
  isLoading: boolean
  onCancel: NonNullable<ModalProps['onCancel']>
  onSubmit: (
    values: SubTaskFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
}
