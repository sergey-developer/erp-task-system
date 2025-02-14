import { AxiosResponse } from 'axios'

import { GetInventorizationEquipmentsTemplateResponse } from '../schemas'

export type GetInventorizationEquipmentsTemplateTransformedResponse = {
  value: GetInventorizationEquipmentsTemplateResponse
  meta?: { response?: AxiosResponse }
}
