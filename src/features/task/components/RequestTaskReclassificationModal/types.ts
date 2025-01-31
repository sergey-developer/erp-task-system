import { FormInstance, ModalProps } from 'antd'

import { CreateTaskReclassificationRequestMutationArgs, TaskModel } from 'features/task/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { FieldsErrors } from 'shared/api/baseApi'

type FormFields = Omit<CreateTaskReclassificationRequestMutationArgs, 'taskId'>

export type RequestTaskReclassificationModalProps = Required<Pick<BaseModalProps, 'open'>> &
  Pick<TaskModel, 'recordId'> & {
    onSubmit: (
      values: RequestTaskReclassificationFormFields,
      setFields: FormInstance<RequestTaskReclassificationFormFields>['setFields'],
    ) => Promise<void>
    onCancel: NonNullable<ModalProps['onCancel']>
    isLoading: boolean
  }

export type RequestTaskReclassificationFormFields = FormFields

export type RequestTaskReclassificationFormErrors = FieldsErrors<FormFields>
