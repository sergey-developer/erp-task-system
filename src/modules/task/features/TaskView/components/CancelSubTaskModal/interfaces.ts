import { FormInstance, ModalProps } from 'antd'
import { DebouncedFunc } from 'lodash'

import { SubTaskModel } from 'modules/subTask/models'
import { DeleteSubTaskMutationArgsModel } from 'modules/task/features/TaskView/models'
import { FieldsErrors } from 'shared/services/api'

type FormFields = Omit<DeleteSubTaskMutationArgsModel, 'taskId'>

export type CancelSubTaskFormFields = Required<FormFields>

export type CancelSubTaskFormErrors = FieldsErrors<FormFields>

export type CancelSubTaskModalProps = Pick<SubTaskModel, 'recordId'> & {
  isLoading: boolean
  onCancel: NonNullable<ModalProps['onCancel']>
  onSubmit: DebouncedFunc<
    (
      values: CancelSubTaskFormFields,
      setFields: FormInstance['setFields'],
    ) => Promise<void>
  >
}
