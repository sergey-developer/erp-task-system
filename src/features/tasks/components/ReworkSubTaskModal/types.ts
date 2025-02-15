import { FormInstance, ModalProps } from 'antd'
import { SubTaskDTO } from 'features/tasks/api/dto'
import { ReworkSubTaskRequest } from 'features/tasks/api/schemas'

import { FieldsErrors } from 'shared/api/baseApi'

type FormFields = Omit<ReworkSubTaskRequest, 'taskId' | 'subTaskId'>

export type ReworkSubTaskFormFields = Required<FormFields>

export type ReworkSubTaskFormErrors = FieldsErrors<FormFields>

export type ReworkSubTaskModalProps = Pick<SubTaskDTO, 'recordId'> & {
  isLoading: boolean
  onCancel: NonNullable<ModalProps['onCancel']>
  onSubmit: (
    values: ReworkSubTaskFormFields,
    setFields: FormInstance<ReworkSubTaskFormFields>['setFields'],
  ) => Promise<void>
}
