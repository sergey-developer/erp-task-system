import { FormInstance, ModalProps } from 'antd'

import { TaskModel } from 'modules/task/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { UploadFile } from 'shared/types/file'

export type TaskResolutionFormFields = {
  techResolution: string
  userResolution?: string
  attachments?: UploadFile[]
}

export type TaskResolutionModalProps = Required<Pick<BaseModalProps, 'open'>> &
  Pick<TaskModel, 'type' | 'recordId'> & {
    isLoading: boolean
    onSubmit: (
      values: TaskResolutionFormFields,
      setFields: FormInstance['setFields'],
    ) => Promise<void>
    onCancel: NonNullable<ModalProps['onCancel']>
    onGetAct: (values: Pick<TaskResolutionFormFields, 'techResolution'>) => Promise<void>
    getActIsLoading: boolean
  }
