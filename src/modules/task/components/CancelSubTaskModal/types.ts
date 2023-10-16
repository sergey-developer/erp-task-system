import { FormInstance, ModalProps } from 'antd'

import { CancelSubTaskMutationArgs, SubTaskModel } from 'modules/task/models'

export type CancelSubTaskFormFields = Omit<
  CancelSubTaskMutationArgs,
  'taskId' | 'subTaskId'
>

export type CancelSubTaskModalProps = Pick<SubTaskModel, 'recordId'> & {
  isLoading: boolean
  onCancel: NonNullable<ModalProps['onCancel']>
  onSubmit: (
    values: CancelSubTaskFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
}
