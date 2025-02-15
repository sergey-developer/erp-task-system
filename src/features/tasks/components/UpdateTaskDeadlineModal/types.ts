import { FormInstance } from 'antd'
import { TaskDetailDTO } from 'features/tasks/api/dto'
import { Moment } from 'moment-timezone'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type UpdateTaskDeadlineModalProps = Pick<
  BaseModalProps,
  'open' | 'onCancel' | 'confirmLoading'
> &
  Pick<TaskDetailDTO, 'olaNextBreachTime' | 'previousOlaNextBreachTime'> & {
    onSubmit: (
      values: UpdateTaskDeadlineModalFormFields,
      setFields: FormInstance['setFields'],
    ) => Promise<void>
  }

export type UpdateTaskDeadlineModalFormFields = Partial<{
  date: Moment
  time: Moment
}>
