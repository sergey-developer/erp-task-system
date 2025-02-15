import { FormInstance, ModalProps } from 'antd'
import { TaskDetailDTO } from 'features/tasks/api/dto'

import { FieldsErrors } from 'shared/api/baseApi'

export type TaskFirstLineFormFields = { description: string }

export type TaskFirstLineFormErrors = FieldsErrors<TaskFirstLineFormFields>

export type TaskFirstLineModalProps = Pick<ModalProps, 'onCancel'> &
  Pick<TaskDetailDTO, 'recordId'> & {
    isLoading: boolean
    onSubmit: (
      values: TaskFirstLineFormFields,
      setFields: FormInstance<TaskFirstLineFormFields>['setFields'],
    ) => Promise<void>
  }
