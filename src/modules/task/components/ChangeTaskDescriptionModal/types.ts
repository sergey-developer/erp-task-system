import { FormInstance } from 'antd'

import { TaskModel } from 'modules/task/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type ChangeTaskDescriptionModalProps = Pick<
  BaseModalProps,
  'open' | 'onCancel' | 'confirmLoading'
> &
  Pick<TaskModel, 'description' | 'previousDescription'> & {
    onSubmit: (
      values: ChangeTaskDescriptionModalFormFields,
      setFields: FormInstance['setFields'],
    ) => Promise<void>
  }

export type ChangeTaskDescriptionModalFormFields = {
  internalDescription: string
}
