import { FormInstance, ModalProps } from 'antd'
import { TaskDetailDTO } from 'features/tasks/api/dto'
import { CreateTaskReclassificationRequestRequest } from 'features/tasks/api/schemas'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { FieldsErrors } from 'shared/api/baseApi'

type FormFields = Omit<CreateTaskReclassificationRequestRequest, 'taskId'>

export type RequestTaskReclassificationModalProps = Required<Pick<BaseModalProps, 'open'>> &
  Pick<TaskDetailDTO, 'recordId'> & {
    onSubmit: (
      values: RequestTaskReclassificationFormFields,
      setFields: FormInstance<RequestTaskReclassificationFormFields>['setFields'],
    ) => Promise<void>
    onCancel: NonNullable<ModalProps['onCancel']>
    isLoading: boolean
  }

export type RequestTaskReclassificationFormFields = FormFields

export type RequestTaskReclassificationFormErrors = FieldsErrors<FormFields>
