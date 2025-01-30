import { AxiosResponse } from 'axios'

import { GetInventorizationEquipmentsTemplateSuccessResponse } from 'features/warehouse/models'

export type GetInventorizationEquipmentsTemplateTransformedSuccessResponse = {
  value: GetInventorizationEquipmentsTemplateSuccessResponse
  meta?: { response?: AxiosResponse }
}
