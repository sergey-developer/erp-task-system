import { AxiosResponse } from 'axios'
import { GetInventorizationEquipmentsTemplateResponse } from 'features/warehouse/models'

export type GetInventorizationEquipmentsTemplateTransformedResponse = {
  value: GetInventorizationEquipmentsTemplateResponse
  meta?: { response?: AxiosResponse }
}
