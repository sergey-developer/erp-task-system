import { FormInstance } from 'antd'
import { TaskDetailDTO } from 'features/tasks/api/dto'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type UpdateTaskDescriptionModalProps = Pick<
  BaseModalProps,
  'open' | 'onCancel' | 'confirmLoading'
> &
  Pick<TaskDetailDTO, 'description' | 'previousDescription'> & {
    onSubmit: (
      values: UpdateTaskDescriptionModalFormFields,
      setFields: FormInstance['setFields'],
    ) => Promise<void>
  }

export type UpdateTaskDescriptionModalFormFields = {
  internalDescription: string
}
