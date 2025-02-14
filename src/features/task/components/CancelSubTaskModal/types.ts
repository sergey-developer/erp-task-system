import { FormInstance, ModalProps } from 'antd'

import { CancelSubTaskRequest, SubTaskModel } from 'features/task/models'

export type CancelSubTaskFormFields = Omit<CancelSubTaskRequest, 'taskId' | 'subTaskId'>

export type CancelSubTaskModalProps = Pick<SubTaskModel, 'recordId'> & {
  isLoading: boolean
  onCancel: NonNullable<ModalProps['onCancel']>
  onSubmit: (
    values: CancelSubTaskFormFields,
    setFields: FormInstance<CancelSubTaskFormFields>['setFields'],
  ) => Promise<void>
}
