import { FormInstance } from 'antd'
import { Moment } from 'moment-timezone'

import { TaskModel } from 'features/task/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type UpdateTaskDeadlineModalProps = Pick<
  BaseModalProps,
  'open' | 'onCancel' | 'confirmLoading'
> &
  Pick<TaskModel, 'olaNextBreachTime' | 'previousOlaNextBreachTime'> & {
    onSubmit: (
      values: UpdateTaskDeadlineModalFormFields,
      setFields: FormInstance['setFields'],
    ) => Promise<void>
  }

export type UpdateTaskDeadlineModalFormFields = Partial<{
  date: Moment
  time: Moment
}>
