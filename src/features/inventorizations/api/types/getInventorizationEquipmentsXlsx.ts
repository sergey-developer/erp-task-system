import { AxiosResponse } from 'axios'

import { GetInventorizationEquipmentsXlsxResponse } from '../schemas'

export type GetInventorizationEquipmentsXlsxTransformedResponse = {
  value: GetInventorizationEquipmentsXlsxResponse
  meta?: { response?: AxiosResponse }
}
