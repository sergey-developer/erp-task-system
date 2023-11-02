import { FormInstance, ModalProps } from 'antd'

import { CreateTaskReclassificationRequestMutationArgs, TaskModel } from 'modules/task/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { FieldsErrors } from 'shared/services/baseApi'

type FormFields = Omit<CreateTaskReclassificationRequestMutationArgs, 'taskId'>

export type RequestTaskReclassificationModalProps = Required<Pick<BaseModalProps, 'open'>> &
  Pick<TaskModel, 'recordId'> & {
    onSubmit: (
      values: RequestTaskReclassificationFormFields,
      setFields: FormInstance['setFields'],
    ) => Promise<void>
    onCancel: NonNullable<ModalProps['onCancel']>
    isLoading: boolean
  }

export type RequestTaskReclassificationFormFields = FormFields

export type RequestTaskReclassificationFormErrors = FieldsErrors<FormFields>
