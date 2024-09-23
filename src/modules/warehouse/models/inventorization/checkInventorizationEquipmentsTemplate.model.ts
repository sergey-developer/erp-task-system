import { IdType } from 'shared/types/common'
import { UploadFileRequestArgs } from 'shared/types/file'

import { CheckedInventorizationEquipmentsModel } from './checkedInventorizationEquipments.model'

export type CheckInventorizationEquipmentsTemplateMutationArgs = UploadFileRequestArgs & {
  inventorization: IdType
}

export type CheckInventorizationEquipmentsTemplateSuccessResponse =
  CheckedInventorizationEquipmentsModel
