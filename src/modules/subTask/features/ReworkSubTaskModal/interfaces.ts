import { FormInstance, ModalProps } from 'antd'

import {
  ReworkSubTaskMutationArgsModel,
  SubTaskModel,
} from 'modules/subTask/models'
import { FieldsErrors } from 'shared/services/api'

type FormFields = Omit<ReworkSubTaskMutationArgsModel, 'taskId' | 'subTaskId'>

export type ReworkSubTaskFormFields = Required<FormFields>

export type ReworkSubTaskFormErrors = FieldsErrors<FormFields>

export type ReworkSubTaskModalProps = Pick<SubTaskModel, 'recordId'> & {
  isLoading: boolean
  onCancel: NonNullable<ModalProps['onCancel']>
  onSubmit: (
    values: ReworkSubTaskFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
}
