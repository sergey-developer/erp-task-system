import { TableRowsApiErrors } from 'shared/api/baseApi'
import { IdType } from 'shared/types/common'
import { UploadFileRequestArgs } from 'shared/types/file'

import { CheckedInventorizationEquipmentsTemplateModel } from './checkedInventorizationEquipmentsTemplate.model'

export type CheckInventorizationEquipmentsTemplateMutationArgs = UploadFileRequestArgs & {
  inventorization: IdType
}

export type CheckInventorizationEquipmentsTemplateSuccessResponse =
  CheckedInventorizationEquipmentsTemplateModel

export type CheckInventorizationEquipmentsTemplateBadRequestErrorResponse = TableRowsApiErrors
