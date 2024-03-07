import { FormInstance, ModalProps } from 'antd'
import { UploadFile } from 'antd/es/upload'

import { TaskModel } from 'modules/task/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type ExecuteTaskModalFormFields = {
  spentHours: number
  spentMinutes: number
  techResolution: string
  userResolution?: string
  attachments?: UploadFile[]
}

export type ExecuteTaskModalProps = Required<Pick<BaseModalProps, 'open'>> &
  Pick<TaskModel, 'type' | 'recordId'> & {
    isLoading: boolean

    onSubmit: (
      values: ExecuteTaskModalFormFields,
      setFields: FormInstance<ExecuteTaskModalFormFields>['setFields'],
    ) => Promise<void>
    onCancel: NonNullable<ModalProps['onCancel']>

    onGetAct: (values: Pick<ExecuteTaskModalFormFields, 'techResolution'>) => Promise<void>
    getActIsLoading: boolean
  }
