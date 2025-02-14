import { TableRowsApiErrors } from 'shared/api/baseApi'
import { IdType } from 'shared/types/common'
import { UploadFileRequestArgs } from 'shared/types/file'

import { CheckedInventorizationEquipmentsTemplateModel } from './checkedInventorizationEquipmentsTemplate.model'

export type CheckInventorizationEquipmentsTemplateRequest = UploadFileRequestArgs & {
  inventorization: IdType
}

export type CheckInventorizationEquipmentsTemplateResponse =
  CheckedInventorizationEquipmentsTemplateModel

export type CheckInventorizationEquipmentsTemplateBadRequestErrorResponse = TableRowsApiErrors
