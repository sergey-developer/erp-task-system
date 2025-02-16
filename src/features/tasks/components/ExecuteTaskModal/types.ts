import { FormInstance, ModalProps } from 'antd'
import { UploadFile } from 'antd/es/upload'
import { TaskDetailDTO } from 'features/tasks/api/dto'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { ResolutionClassificationsCatalogDTO } from 'shared/catalogs/resolutionClassifications/api/dto'
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
  Pick<TaskDetailDTO, 'type' | 'recordId' | 'supportGroup'> & {
    isLoading: boolean

    resolutionClassifications: ResolutionClassificationsCatalogDTO
    resolutionClassificationsIsLoading: boolean

    onSubmit: (
      values: ExecuteTaskFormFields,
      setFields: FormInstance<ExecuteTaskFormFields>['setFields'],
    ) => Promise<void>
    onCancel: NonNullable<ModalProps['onCancel']>

    onGetAct: (values: Pick<ExecuteTaskFormFields, 'techResolution'>) => Promise<void>
    getActIsLoading: boolean
  }
