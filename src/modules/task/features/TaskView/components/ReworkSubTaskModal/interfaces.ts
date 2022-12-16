import { FormInstance, ModalProps } from 'antd'
import { DebouncedFunc } from 'lodash'

import { SubTaskModel } from 'modules/subTask/models'
import { ReworkSubTaskMutationArgsModel } from 'modules/task/features/TaskView/models'
import { FieldsErrors } from 'shared/services/api'

type FormFields = Omit<ReworkSubTaskMutationArgsModel, 'taskId'>

export type ReworkSubTaskFormFields = Required<FormFields>

export type ReworkSubTaskFormErrors = FieldsErrors<FormFields>

export type ReworkSubTaskModalProps = Pick<SubTaskModel, 'recordId'> & {
  isLoading: boolean
  onCancel: NonNullable<ModalProps['onCancel']>
  onSubmit: DebouncedFunc<
    (
      values: ReworkSubTaskFormFields,
      setFields: FormInstance['setFields'],
    ) => Promise<void>
  >
}
