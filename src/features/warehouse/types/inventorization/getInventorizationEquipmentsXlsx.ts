import { AxiosResponse } from 'axios'
import { GetInventorizationEquipmentsXlsxResponse } from 'features/warehouse/models'

export type GetInventorizationEquipmentsXlsxTransformedResponse = {
  value: GetInventorizationEquipmentsXlsxResponse
  meta?: { response?: AxiosResponse }
}
