import { FormInstance, ModalProps } from 'antd'

import { TaskModel } from 'modules/task/models'

import { UploadFile } from 'shared/types/file'

export type ExecuteTaskModalFormFields = {
  techResolution: string
  userResolution?: string
  attachments?: UploadFile[]
}

export type ExecuteTaskModalProps = Pick<TaskModel, 'type' | 'recordId'> & {
  isLoading: boolean
  onSubmit: (
    values: ExecuteTaskModalFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
  onCancel: NonNullable<ModalProps['onCancel']>
  onGetAct: (values: Pick<ExecuteTaskModalFormFields, 'techResolution'>) => Promise<void>
  getActIsLoading: boolean
}
