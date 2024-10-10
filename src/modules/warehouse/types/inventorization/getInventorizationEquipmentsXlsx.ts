import { AxiosResponse } from 'axios'

import { GetInventorizationEquipmentsXlsxSuccessResponse } from 'modules/warehouse/models'

export type GetInventorizationEquipmentsXlsxTransformedSuccessResponse = {
  value: GetInventorizationEquipmentsXlsxSuccessResponse
  meta?: { response?: AxiosResponse }
}
