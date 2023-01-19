import { FormInstance, ModalProps } from 'antd'

import { CancelSubTaskMutationArgs, SubTaskModel } from 'modules/subTask/models'
import { FieldsErrors } from 'shared/services/api'

type FormFields = Omit<CancelSubTaskMutationArgs, 'taskId' | 'subTaskId'>

export type CancelSubTaskFormFields = Required<FormFields>

export type CancelSubTaskFormErrors = FieldsErrors<FormFields>

export type CancelSubTaskModalProps = Pick<SubTaskModel, 'recordId'> & {
  isLoading: boolean
  onCancel: NonNullable<ModalProps['onCancel']>
  onSubmit: (
    values: CancelSubTaskFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
}
