import { FormInstance } from 'antd'

import { TaskModel } from 'features/task/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type UpdateTaskDescriptionModalProps = Pick<
  BaseModalProps,
  'open' | 'onCancel' | 'confirmLoading'
> &
  Pick<TaskModel, 'description' | 'previousDescription'> & {
    onSubmit: (
      values: UpdateTaskDescriptionModalFormFields,
      setFields: FormInstance['setFields'],
    ) => Promise<void>
  }

export type UpdateTaskDescriptionModalFormFields = {
  internalDescription: string
}
