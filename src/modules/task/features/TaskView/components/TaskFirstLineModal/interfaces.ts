import { FormInstance, ModalProps } from 'antd'

import { TaskDetailsModel } from 'modules/task/models'
import { FieldsErrors } from 'shared/services/api'

export type TaskFirstLineFormFields = { description: string }

export type TaskFirstLineFormErrors = FieldsErrors<TaskFirstLineFormFields>

export type TaskFirstLineModalProps = Pick<ModalProps, 'onCancel'> &
  Pick<TaskDetailsModel, 'recordId'> & {
    isLoading: boolean
    onSubmit: (
      values: TaskFirstLineFormFields,
      setFields: FormInstance['setFields'],
    ) => Promise<void>
  }
