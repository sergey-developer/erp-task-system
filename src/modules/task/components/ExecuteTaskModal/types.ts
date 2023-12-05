import { FormInstance, ModalProps } from 'antd'
import { UploadFile } from 'antd/lib/upload'

import { TaskModel } from 'modules/task/models'

export type ExecuteTaskModalFormFields = {
  techResolution: string
  userResolution?: string
  attachments?: UploadFile[]
}

export type ExecuteTaskModalProps = Pick<TaskModel, 'type' | 'recordId'> &
  Required<Pick<ModalProps, 'open'>> & {
    isLoading: boolean
    onSubmit: (
      values: ExecuteTaskModalFormFields,
      setFields: FormInstance['setFields'],
    ) => Promise<void>
    onCancel: NonNullable<ModalProps['onCancel']>
    onGetAct: (values: Pick<ExecuteTaskModalFormFields, 'techResolution'>) => Promise<void>
    getActIsLoading: boolean
  }
