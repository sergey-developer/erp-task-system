import { FormInstance, ModalProps } from 'antd'
import { UploadFile } from 'antd/es/upload/interface'

import { TaskModel } from 'modules/task/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type ExecuteTaskModalFormFields = {
  techResolution: string
  userResolution?: string
  attachments?: UploadFile[]
}

export type ExecuteTaskModalProps = Required<Pick<BaseModalProps, 'open'>> &
  Pick<TaskModel, 'type' | 'recordId'> & {
    isLoading: boolean
    onSubmit: (
      values: ExecuteTaskModalFormFields,
      setFields: FormInstance['setFields'],
    ) => Promise<void>
    onCancel: NonNullable<ModalProps['onCancel']>
    onGetAct: (values: Pick<ExecuteTaskModalFormFields, 'techResolution'>) => Promise<void>
    getActIsLoading: boolean
  }
