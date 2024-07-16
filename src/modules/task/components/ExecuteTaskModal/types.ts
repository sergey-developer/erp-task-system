import { FormInstance, ModalProps } from 'antd'
import { UploadFile } from 'antd/es/upload'

import { TaskModel } from 'modules/task/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { ResolutionClassificationsModel } from 'shared/models/catalogs/resolutionClassifications'
import { IdType } from 'shared/types/common'
import { SetNonNullable } from 'shared/types/utils'

export type ExecuteTaskFormFields = {
  spentHours: number
  spentMinutes: number
  techResolution: string
  userResolution?: string
  resolutionClassifier1?: IdType
  attachments?: UploadFile[]
}

export type ExecuteTaskModalProps = SetNonNullable<BaseModalProps, 'open'> &
  Pick<TaskModel, 'type' | 'recordId' | 'supportGroup'> & {
    isLoading: boolean

    resolutionClassifications: ResolutionClassificationsModel
    resolutionClassificationsIsLoading: boolean

    onSubmit: (
      values: ExecuteTaskFormFields,
      setFields: FormInstance<ExecuteTaskFormFields>['setFields'],
    ) => Promise<void>
    onCancel: NonNullable<ModalProps['onCancel']>

    onGetAct: (values: Pick<ExecuteTaskFormFields, 'techResolution'>) => Promise<void>
    getActIsLoading: boolean
  }
