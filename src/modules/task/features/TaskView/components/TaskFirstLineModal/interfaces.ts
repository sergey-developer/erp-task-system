import { FormInstance, ModalProps } from 'antd'

import { FieldsErrors } from 'shared/services/api'

import { TaskDetailsModel } from '../../models'

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
