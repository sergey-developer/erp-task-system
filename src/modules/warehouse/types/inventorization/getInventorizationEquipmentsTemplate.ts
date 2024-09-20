import { AxiosResponse } from 'axios'

import { GetInventorizationEquipmentsTemplateSuccessResponse } from 'modules/warehouse/models'

export type GetInventorizationEquipmentsTemplateTransformedSuccessResponse = {
  value: GetInventorizationEquipmentsTemplateSuccessResponse
  meta?: { response?: AxiosResponse }
}
