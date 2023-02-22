import { FormInstance, ModalProps } from 'antd'

import { TaskModel } from 'modules/task/models'

import { FieldsErrors } from 'shared/services/api'

export type TaskFirstLineFormFields = { description: string }

export type TaskFirstLineFormErrors = FieldsErrors<TaskFirstLineFormFields>

export type TaskFirstLineModalProps = Pick<ModalProps, 'onCancel'> &
  Pick<TaskModel, 'recordId'> & {
    isLoading: boolean
    onSubmit: (
      values: TaskFirstLineFormFields,
      setFields: FormInstance['setFields'],
    ) => Promise<void>
  }
