import { FormInstance, ModalProps } from 'antd'

import { TaskModel } from 'modules/task/models'

export type TaskSecondLineFormFields = {
  workGroup: number
  markAsDefault?: boolean
  comment?: string
}

export type TaskSecondLineModalProps = Pick<TaskModel, 'id' | 'recordId'> & {
  isLoading: boolean
  onSubmit: (
    values: TaskSecondLineFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
  onCancel: NonNullable<ModalProps['onCancel']>
}
