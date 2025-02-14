import { TableRowsApiErrors } from 'shared/api/baseApi'
import { IdType } from 'shared/types/common'
import { RequestWithFile } from 'shared/types/file'

import { CheckedInventorizationEquipmentsTemplateDTO } from '../dto'

export type CheckInventorizationEquipmentsTemplateRequest = RequestWithFile & {
  inventorization: IdType
}

export type CheckInventorizationEquipmentsTemplateResponse =
  CheckedInventorizationEquipmentsTemplateDTO

export type CheckInventorizationEquipmentsTemplateBadRequestResponse = TableRowsApiErrors
