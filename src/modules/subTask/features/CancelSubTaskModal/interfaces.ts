import { FormInstance, ModalProps } from 'antd'
import { DebouncedFunc } from 'lodash'

import {
  CancelSubTaskMutationArgsModel,
  SubTaskModel,
} from 'modules/subTask/models'
import { FieldsErrors } from 'shared/services/api'

type FormFields = Omit<CancelSubTaskMutationArgsModel, 'taskId'>

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
