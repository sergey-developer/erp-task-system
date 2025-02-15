import { FormInstance, ModalProps } from 'antd'
import { SubTaskDTO } from 'features/tasks/api/dto'
import { CancelSubTaskRequest } from 'features/tasks/api/schemas'

export type CancelSubTaskFormFields = Omit<CancelSubTaskRequest, 'taskId' | 'subTaskId'>

export type CancelSubTaskModalProps = Pick<SubTaskDTO, 'recordId'> & {
  isLoading: boolean
  onCancel: NonNullable<ModalProps['onCancel']>
  onSubmit: (
    values: CancelSubTaskFormFields,
    setFields: FormInstance<CancelSubTaskFormFields>['setFields'],
  ) => Promise<void>
}
